

export const Left = () => {
    return (
        <div className="w-1/2 border border-neutral-300 rounded-md">
            <h2 className="text-xl  text-neutral-800 p-4 border-b border-neutral-300 font-kumbh font-bold">Shipping Address</h2>
            <div className="p-4">
                <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-1">First Name</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="First Name" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Last Name</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Last Name" />
                </div>                
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Country</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Country" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">State</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="State" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">City</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="City" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Postcode</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Postcode" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Address Line 1</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Address Line 1" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Address Line 2</label>
                    <input type="text" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Address Line 2 (Optional)" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Email" />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-neutral-700 mb-1">Phone</label>
                    <input type="tel" className="w-full border border-neutral-300 rounded-md p-2" placeholder="Phone Number" />
                </div>
                
            </div>
        </div>
    )
}