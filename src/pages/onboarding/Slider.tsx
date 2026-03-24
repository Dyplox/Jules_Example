import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/settingsStore';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Control Total de tu Finca',
    description: 'Registra y monitorea todo tu ganado, lotes y producción en tiempo real.',
    image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Trabaja Sin Internet',
    description: 'Nuestra app funciona 100% offline. Registra datos en el potrero y sincroniza al llegar a casa.',
    image: 'https://images.unsplash.com/photo-1596733430284-f743726bfc40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Colaboración en Equipo',
    description: 'Invita a tus empleados y asigna permisos específicos para mantener tu información segura.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const setHasSeenOnboarding = useSettingsStore((state) => state.setHasSeenOnboarding);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setHasSeenOnboarding(true);
      navigate('/onboarding/step1');
    }
  };

  const handleSkip = () => {
    setHasSeenOnboarding(true);
    navigate('/onboarding/step1');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between p-6">
        {/* Skip button */}
        <div className="flex justify-end pt-8">
          <button
            onClick={handleSkip}
            className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
          >
            Saltar
          </button>
        </div>

        {/* Content */}
        <div className="mb-12">
          {/* Indicators */}
          <div className="flex gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-600'
                }`}
              />
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-4 tracking-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-slate-300">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Action button */}
        <div className="pb-8">
          <button
            onClick={handleNext}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-4 px-6 flex items-center justify-between font-semibold transition-colors tactical-glass"
          >
            <span>{currentSlide === slides.length - 1 ? 'Empezar' : 'Siguiente'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
