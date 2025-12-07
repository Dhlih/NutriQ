import * as React from "react";
import { CheckCircle2, Info, XCircle, AlertTriangle } from "lucide-react";

const Alert = React.forwardRef(
    ({ className, variant = "default", title, children, ...props }, ref) => {
        const variants = {
            default: {
                container: "bg-white border-[#D5E1C3] text-[#2C3A2C]",
                iconColor: "text-[#4A624E]",
                icon: Info,
            },
            success: {
                container: "bg-[#E9EFDB] border-[#D5E1C3] text-[#2C3A2C]",
                iconColor: "text-[#4A624E]",
                icon: CheckCircle2,
            },
            destructive: {
                container: "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]", // Merah pasti
                iconColor: "text-[#DC2626]",
                icon: XCircle,
            },
            warning: {
                // KUNING PASTI MUNCUL (HEX CODE)
                container: "bg-[#FFFBEB] border-[#FCD34D] text-[#92400E]",
                iconColor: "text-[#F59E0B]",
                icon: AlertTriangle,
            },
        };

        const style = variants[variant] || variants.default;
        const IconComponent = style.icon;

        return (
            <div
                ref={ref}
                role="alert"
                // MENGGUNAKAN FLEXBOX (Lebih Stabil daripada Absolute)
                className={`flex w-full items-start gap-3 rounded-xl border p-4 shadow-lg transition-all ${style.container} ${className}`}
                {...props}
            >
                {/* Ikon dengan shrink-0 agar tidak gepeng */}
                <div className="shrink-0 mt-0.5">
                    <IconComponent className={`h-5 w-5 ${style.iconColor}`} />
                </div>

                {/* Konten Teks */}
                <div className="flex-1">
                    {title && (
                        <h5 className="font-bold text-sm ">
                            {title}
                        </h5>
                    )}
                </div>
            </div>
        );
    }
);
Alert.displayName = "Alert";

export default Alert;
