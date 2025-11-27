import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        Register
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        {/* Nama */}
                        <div>
                            <Label>Nama</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Label>Password (min 8 karakter)</Label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Password Confirmation */}
                        <div>
                            <Label>Konfirmasi Password</Label>
                            <Input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-600 text-sm">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button className="w-full" disabled={processing}>
                            {processing ? "Processing..." : "Daftar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
