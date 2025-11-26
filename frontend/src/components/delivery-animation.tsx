"use client";
import { cdnImagePath } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DeliveryAnimation() {
  return (
    <DotLottieReact
      src={cdnImagePath(`/images/Food-prep.lottie`)}
      loop
      autoplay
    />
  );
}
