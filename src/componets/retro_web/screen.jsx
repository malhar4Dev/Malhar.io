import { useState } from "react";
import AppIcon from "./icon";
import Window from "./window";
import GreeterCmd from "./greeterCmd";
import ResumeIcon from "../../assets/text_file_logo.png";
import ResumeFile from "../../assets/Malhar_kulkarni_resume.pdf";

const Screen = () => {
    const [iscmdOpen, setisCmdOpen] = useState(true);
    const [showResume, setShowResume] = useState(false);

    return (
        <>
            <div className="h-screen w-screen relative p-4 overflow-hidden">
                <GreeterCmd />

                <div className="resume-app absolute">
                    <AppIcon sourceImage={ResumeIcon} Name="Resume.txt" Doubleclick={() => setShowResume(true)} />
                </div>

                {showResume && (
                    <Window title="My Resume" onClose={() => setShowResume(false)} child={
                        <embed src={ResumeFile} className="w-full h-full" type="application/pdf" /> }
                    />
                )}

            </div>





        </>


    );
};

export default Screen;
