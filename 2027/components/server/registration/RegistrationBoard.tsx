import Image from "next/image";
import { withBasePath } from "@/lib/utils";

/**
 * Tan invitation board with the dashed stitched border and the mascot
 * watermark asset supplied for the registration page.
 */
export default function RegistrationBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="registration-board">
      <Image
        src={withBasePath(
          "/2027_images/registration_page/card/card_bottom_right_corner_watermark.svg",
        )}
        alt=""
        width={566}
        height={460}
        className="registration-board-watermark"
      />
      <div className="registration-board-content">{children}</div>
    </div>
  );
}
