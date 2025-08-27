import { useEffect, useState } from 'react';
import { HeartHandshake, MoveRight } from 'lucide-react';
import img1 from '../assets/car-crashed.jpg';
import img2 from '../assets/car-insurance.jpg';
import img3 from '../assets/insuranceAgent-working-site-car.jpg';
import img4 from '../assets/car-insurance-claim.jpg';
import img5 from '../assets/insurance-company.jpeg';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/Logo-img.png'
import LogoName from '../assets/Logo-Name.png'

const images = [ img1, img2, img3, img4, img5 ];

const Introduction = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
  <div className="min-h-screen flex flex-col bg-white">  
    <div className="flex items-center px-6 py-3 shadow-[1px_1px_10px_rgba(0,0,0,0.2)] shadow-slate-400  mb-44">
      <img src={LogoImage} className="h-12 w-12" alt="LogoImage in navbar" />
      <img src={LogoName} className="h-12 w-45" alt="LogoName in navbar" />
    </div>

    <div className="flex-1 flex items-start justify-center hero px-4 lg:px-24 mt-1">
      <div className="hero-content flex-col lg:flex-row gap-8  rounded-xl shadow-[1px_1px_15px_rgba(0,0,0,0.2)] shadow-slate-500">
        <div className="relative w-[450px] h-[399px] rounded-lg overflow-hidden ">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ease-in-out ${
                index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
        </div>

        <div className="max-w-xl">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-flex">
              Welcome <HeartHandshake size={40} color="rgb(231,120,10)" />
            </span>
          </h1>
          <p
            className="py-5 leading-relaxed text-black"
            style={{ fontFamily: '"Libertinus Math", system-ui' }}
          >
            We are a professional private detective agency offering a wide range of investigative services for individuals, employees, and companies. Our team is composed of highly experienced and skilled professionals.
            <br /><br />
            We specialize in insurance fraud investigations, including background checks, written and recorded statements, and thorough interviews with witnesses and suspects. Our investigators utilize a variety of tools and techniques to uncover factual information related to fraud cases filed against insurers.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="mt-6 w-40 h-11 group shadow-black shadow-[0px_1px_10px_rgba(0,0,0,0.2)] 
                      border border-black rounded-xl 
                      bg-white text-black hover:bg-black hover:text-white 
                      transition-all duration-300"
          >
            <span className="flex items-center justify-center">
              <span className="mr-1 text-xs">Get Started</span>
              <MoveRight
                size={20}
                className="transition-all duration-300 group-hover:translate-x-3 group-hover:scale-110"
              />
            </span>
          </button>

        </div>
      </div>
    </div>
  </div>
);

};

export default Introduction;