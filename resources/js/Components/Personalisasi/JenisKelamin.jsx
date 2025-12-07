import { useState } from "react";
import { Mars, Venus } from "lucide-react";
import Title from "../Title";
import SelectBox from "../SelectBox";


export default function JenisKelamin({ setData, data }) {
    const [selectedGender, setSelectedGender] = useState(
        data.jenis_kelamin || null
    );

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setData("jenis_kelamin", gender);
    };

    return (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Icon Visual */}

            <Title
                text="Apa jenis kelamin Anda?"
                className="text-3xl md:text-4xl font-bold text-center text-[#2C3A2C] mb-4"
            />

            <div className="flex md:gap-8 gap-6 items-center justify-center md:w-full w-[90%] mt-8">
                <SelectBox
                    label="Laki-laki"
                    icon={Mars}
                    active={selectedGender === "Laki-laki"}
                    onClick={() => handleGenderSelect("Laki-laki")}
                    className="w-40 h-40 p-[1.8rem]"
                    iconSize={42}
                />
                <SelectBox
                    label="Perempuan"
                    icon={Venus}
                    active={selectedGender === "Perempuan"}
                    onClick={() => handleGenderSelect("Perempuan")}
                    className="w-40 h-40 p-[1.8rem]"
                    iconSize={42}
                />
            </div>
        </div>
    );
}
