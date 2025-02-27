import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader">
      <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24}/>
    </div>
  )
}

export default Loader;
