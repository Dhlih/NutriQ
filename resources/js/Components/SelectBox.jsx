const SelectBox = ({ label, icon: Icon, active, onClick, desc, className, iconSize }) => {
    return (
        <div
            onClick={onClick}
            className={`
                cursor-pointer flex flex-col items-center justify-center gap-3 p-4
                w-full h-full min-h-[140px] rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${className}
                ${
                    active
                        ? "border-[#4A624E] bg-[#E9EFDB] text-[#2C3A2C] shadow-md scale-[1.02]"
                        : "border-[#D5E1C3] bg-white text-[#5C6F5C] hover:border-[#7A9E7E] hover:bg-[#F9FAEF]"
                }
            `}
        >
            <div
                className={`p-3 rounded-full transition-colors ${
                    active
                        ? "bg-[#4A624E] text-white"
                        : "bg-[#F7F9F0] text-[#7A9E7E] group-hover:bg-[#E9EFDB]"
                }`}
            >
                <Icon size={iconSize} strokeWidth={2} />
            </div>
            <div className="text-center">
                <span className="font-bold text-base md:text-lg block leading-tight">
                    {label}
                </span>
                {/* Deskripsi kecil (opsional) */}
                {desc && (
                    <span className="text-xs opacity-80 mt-1 block">
                        {desc}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SelectBox;
