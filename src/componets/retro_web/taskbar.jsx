import '/src/global.css';
import Icon from './icon';
import ThemeToggle from './theme-toggle';
import ThemeMusic from './theme-music';
import folder_icon from '../../assets/folder_icon.png'
import mk_logo from '../../assets/mk_logo.png'
import server_icon from '../../assets/server_icon.png'
import big_folder_icon from '../../assets/big_folder_icon.png'



const Taskbar = ({mode}) => {
    return (
        <>
            <div className="taskbar flex flex-row h-[7vh] bg-blue-500 fixed bottom-0 left-0 w-full gap-3 justify-between items-center">
                <div className="start-icon p-3">
                    <Icon sourceImage = {mk_logo} />
                </div>
                <div className="search-field flex items-center gap-2 bg-blue-400 px-2 py-1 rounded-4xl">
                    <i className = "fa-solid fa-magnifying-glass text-sm text-white mx-1"></i>
                    <input type="text" placeholder='search here' className='text-white align-middle font-normal outline-0 ' />
                </div>
                <div className="taskbar_icons flex gap-2 w-1/2">
                    <Icon sourceImage = {server_icon} />
                    <Icon sourceImage = {big_folder_icon} />
                    <Icon sourceImage = {folder_icon} />
                </div>
                <div className="details bg-white w-1/4 m-2 h-[80%]">
                    <div className="animated-icons bg-purple-300 w-1/3 h-full flex items-center ">
                        <div className="mode-toogle w-1/3 h-fit">
                            
                            <ThemeToggle />
                        </div>
                        <div className="music-toggle">
                            <ThemeMusic />
                            
                        </div>
                        <div className="charging-animation">

                        </div>
                    </div>
                    <div className="weather-report">
                        {/* <Weather /> */}
                    </div>
                    <div className="time-date-log">

                    </div>
                
                </div>
            </div>
        </>
    );
}

export default Taskbar;
