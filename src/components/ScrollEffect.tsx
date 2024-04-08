import { Fade, Slide, Zoom, Bounce, Flip, JackInTheBox, Roll, Rotate } from "react-awesome-reveal";
import { Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";


const customAnimation = keyframes`
  from {
    opacity: 0;
    filter: blur(2px);
    transform: translateX(-10%);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
  }
`;

interface FadeSectionProps {
  effect?: string;
  duration?: number;
  direction?: string;
  triggerOnce?: boolean;
  fraction?: number;
  cascade?: boolean;
  className?: string;
  damping?: number;
  delay?: number;
  children: React.ReactNode;
};


const ScrollEffect = (
    {
        effect = "reveal",
        duration,
        direction = "",
        triggerOnce,
        fraction,
        cascade,
        className,
        damping,
        delay,
        children
    }:FadeSectionProps) => {

      let AnimationComponent;
      let componentProps: any = {
        duration,
        direction,
        triggerOnce,
        fraction,
        damping,
        delay,
        cascade,
        className
      };
    
      if (effect === "reveal") {
        componentProps.keyframes = customAnimation;
      }

      switch (effect) {
        case "fade":
          AnimationComponent = Fade;
          break;
        case "slide":
          AnimationComponent = Slide;
          break;
        case "zoom":
          AnimationComponent = Zoom;
          break;
        case "bounce":
          AnimationComponent = Bounce;
          break;
        case "flip":
          AnimationComponent = Flip;
          break;
        case "jackInTheBox":
          AnimationComponent = JackInTheBox;
          break;
        case "rotate":
          AnimationComponent = Rotate;
          break;
        default:
          AnimationComponent = Reveal;
      }

    return (
            <>
              <AnimationComponent {...componentProps}>
                  {children}
              </AnimationComponent>
            </>
    );
}

export default ScrollEffect;
