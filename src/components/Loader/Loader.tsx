import Image from "next/image";
import loader from '@/assets/loader.gif'
const Loader = () => (
  <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
    <Image
      src={loader}
      alt='loader'
      width={100}
      height={100}
      className='object-contain'
    />
    <p className='text-sm font-bold text-primary-grey-300'>please wait...</p>
  </div>
);

export default Loader;
