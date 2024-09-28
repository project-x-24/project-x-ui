import { CompanyLogo } from '../../assets';
import { MenuIcon } from '../../assets'; 

const Header = () => {
  return (
    <header className="flex justify-between pt-4 h-[50px] items-center p-4 bg-white ">
      {/* Company Logo and Name */}
      <div className="flex items-center">
        <CompanyLogo className="h-[50px] w-[100px] mr-3" />
      </div>

      {/* Menu Icon */}
      <button className="p-2 focus:outline-none">
        <MenuIcon className="h-6 w-6 text-gray-600" />
      </button>
    </header>
  );
};

export default Header;
