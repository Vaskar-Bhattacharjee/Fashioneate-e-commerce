import { dbConnect } from "@/src/lib/dbConnect";
import { checkout } from "@/src/model/checkout.model";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const range = searchParams.get("range") || "30d";
        
        // Calculate date range
        const now = new Date();
        const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 365;
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        const prevStartDate = new Date(startDate.getTime() - days * 24 * 60 * 60 * 1000);

        // Revenue calculation (completed orders only)
        const revenueQuery = {
            $or: [
                { paymentMethod: "Online", status: { $nin: ["Cancelled", "Failed", "Refunded"] } },
                { paymentMethod: "COD", status: "Delivered" }
            ],
            createdAt: { $gte: startDate }
        };

        const prevRevenueQuery = {
            $or: [
                { paymentMethod: "Online", status: { $nin: ["Cancelled", "Failed", "Refunded"] } },
                { paymentMethod: "COD", status: "Delivered" }
            ],
            createdAt: { $gte: prevStartDate, $lt: startDate }
        };

        const [
            // Overview Stats
            totalRevenue,
            prevRevenue,
            totalOrders,
            prevOrders,
            totalCustomers,
            pendingOrders,
            lowStockProducts,
            totalProducts,
            
            // Trends
            salesTrend,
            categoryDistribution,
            topProducts,
            recentOrders,
            orderStatusBreakdown
        ] = await Promise.all([
            // Current period revenue
            checkout.aggregate([
                { $match: revenueQuery },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]),
            
            // Previous period revenue for comparison
            checkout.aggregate([
                { $match: prevRevenueQuery },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]),
            
            // Total orders
            checkout.countDocuments({ createdAt: { $gte: startDate } }),
            
            // Previous period orders
            checkout.countDocuments({ createdAt: { $gte: prevStartDate, $lt: startDate } }),
            
            // Unique customers
            checkout.distinct("customerInfo.email", { createdAt: { $gte: startDate } }),
            
            // Pending orders
            checkout.countDocuments({ status: "Pending" }),
            
            // Low stock
            Product.countDocuments({ quantity: { $lt: 5 } }),
            
            // Total active products
            Product.countDocuments({ status: "active" }),
            
            // Daily sales trend
            checkout.aggregate([
                { $match: revenueQuery },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        revenue: { $sum: "$totalAmount" },
                        orders: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ]),
            
            // Sales by category (from order items)
            checkout.aggregate([
                { $match: revenueQuery },
                { $unwind: "$items" },
                {
                    $group: {
                        _id: "$items.category",
                        value: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
                    }
                },
                { $sort: { value: -1 } }
            ]),
            
            // Top selling products
            checkout.aggregate([
                { $match: revenueQuery },
                { $unwind: "$items" },
                {
                    $group: {
                        _id: "$items.name",
                        sales: { $sum: "$items.quantity" },
                        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
                    }
                },
                { $sort: { sales: -1 } },
                { $limit: 5 }
            ]),
            
            // Recent orders
            checkout.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("orderId customerInfo.name totalAmount status createdAt paymentMethod"),
            
            // Order status breakdown
            checkout.aggregate([
                { $match: { createdAt: { $gte: startDate } } },
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ])
        ]);

        // Calculate percentage changes
        const currentRevenue = totalRevenue[0]?.total || 0;
        const previousRevenue = prevRevenue[0]?.total || 0;
        const revenueChange = previousRevenue ? Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100) : 0;
        const ordersChange = prevOrders ? Math.round(((totalOrders - prevOrders) / prevOrders) * 100) : 0;

        // Format category data with colors
        const colors = ["#3b82f6", "#22c55e", "#a855f7", "#f97316", "#ef4444", "#06b6d4"];
        const formattedCategories = categoryDistribution.map((cat: any, idx: number) => ({
            name: cat._id || "Uncategorized",
            value: Math.round(cat.value),
            color: colors[idx % colors.length]
        }));

        // Calculate category percentages
        const totalCategoryValue = formattedCategories.reduce((sum, cat) => sum + cat.value, 0);
        const categoriesWithPercentage = formattedCategories.map(cat => ({
            ...cat,
            percentage: totalCategoryValue ? Math.round((cat.value / totalCategoryValue) * 100) : 0
        }));

        return NextResponse.json({
            success: true,
            overview: {
                totalRevenue: currentRevenue,
                revenueChange,
                totalOrders,
                ordersChange,
                totalCustomers: totalCustomers.length,
                customersChange: 12, // Calculate if you have historical data
                totalProducts,
                productsChange: 5,  // Calculate if you have historical data
                pendingOrders,
                lowStockProducts
            },
            salesTrend: salesTrend.map((day: any) => ({
                date: day._id,
                revenue: day.revenue,
                orders: day.orders
            })),
            categoryDistribution: categoriesWithPercentage,
            topProducts: topProducts.map((prod: any) => ({
                name: prod._id,
                sales: prod.sales,
                revenue: prod.revenue
            })),
            recentOrders: recentOrders.map((order: any) => ({
                id: order.orderId,
                customer: order.customerInfo?.name || "Guest",
                amount: order.totalAmount,
                status: order.status.toLowerCase(),
                date: order.createdAt,
                paymentMethod: order.paymentMethod
            })),
            orderStatus: orderStatusBreakdown.reduce((acc: any, curr: any) => {
                acc[curr._id.toLowerCase()] = curr.count;
                return acc;
            }, {})
        });
        
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json({ message: "Error fetching analytics" }, { status: 500 });
    }
}