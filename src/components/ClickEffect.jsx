import { useEffect } from 'react';
import './ClickEffect.css';

const ClickEffect = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const circle = document.createElement('div');
      circle.classList.add('click-effect');
      circle.style.left = `${e.clientX}px`;
      circle.style.top = `${e.clientY}px`;
      document.body.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default ClickEffect;
