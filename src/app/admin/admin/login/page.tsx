"use client";
import { Container } from "@/src/components/ui/container";
import { Heading, SubHeading } from "@/src/components/ui/header";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof loginSchema>;
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/moderator/mod-access", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        router.push("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err: unknown) {
      console.log("error while logging in", err);
      setLoading(false);
    }
  };

  return (
    <Container className="pt-10 md:pt-18 lg:pt-32">
      <div className="flex items-center justify-between px-10 w-4xl mx-auto border border-neutral-200 rounded-lg h-70">
        <div className="flex flex-col items-start justify-between gap-4 relative">
          <div
            className={cn(
              "absolute inset-0 pointer-events-none ",
              "bg-size-[40px_40px]",
              "bg-[linear-gradient(to_right,#d2d1d1_1px,transparent_1px),linear-gradient(to_bottom,#d2d1d1_1px,transparent_1px)]",
              "mask-l-from-70% mask-r-from-70% mask-t-from-70% mask-b-from-70% ",
            )}
          />
          <Heading className="z-10">Admin Login</Heading>
          <SubHeading className="text-left md:text-sm py-0 md:w-80 z-10  md:px-0">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
            quas dolore beatae impedit quasi in iure maiores quod assumenda
            vitae.
          </SubHeading>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-center gap-2"
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Enter Your Email"
            className="w-90 h-12 px-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black placeholder:text-neutral-400"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Enter Your Password"
            className="w-90 h-12 px-4 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black placeholder:text-neutral-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-neutral-700 text-white w-90 h-12 rounded-lg cursor-pointer text-xl font-cormorantGaramond hover:bg-neutral-900 transition-all disabled:bg-neutral-400"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
