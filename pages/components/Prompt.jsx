import { useState, useEffect, Suspense } from "react";
import { openai } from "../../openapiConfig";
import Image from "next/image";
import Loading from "./Loading";

export default function Prompt() {
  const [dalleImage, setDalleImage] = useState();
  const [loading, isLoading] = useState(false);

  const imageRequest = async (promptText) => {
    isLoading(true);

    const response = await openai.createImage({
      prompt: promptText,
      n: 1,
      size: "1024x1024",
    });

    setDalleImage(response.data.data[0].url);

    isLoading(false);
  };

  useEffect(() => {
    window.miro.board.ui.on("drop", async (e) => {
      const { x, y, target } = e;
      console.log("TARGET:", target);
      console.log("TARGET SRC:", target.src);
      try {
        if (target instanceof HTMLImageElement) {
          console.log("Place");
          const image = await miro.board.createImage({
            x,
            y,
            url: target.src,
          });

          console.log("IMAGE:", image);
          await miro.board.viewport.zoomTo(image);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }, [dalleImage]);

  return (
    <div>
      <div className="form-group">
        <label htmlFor="imageprompt"> Enter your Image Prompt </label>
        <input
          className="input"
          type="text"
          placeholder="Spiderman tapdancing in a bowler hat"
          id="imageprompt"
          /*           onKeyDown={() => {
            imageRequest(document.getElementById("imageprompt").value);
          }} */
        />
      </div>
      <button
        className="button button-primary"
        type="button"
        onClick={() => {
          imageRequest(document.getElementById("imageprompt").value);
        }}
      >
        Submit
      </button>

      <div className="grid">
        <div className="cs1 ce12">
          {/* { dalleImage == undefined ? null : (
              <Suspense fallback={ <Loading /> }>
                <Image
                  src={dalleImage}
                  alt="this is an generated Image"
                  width={200}
                  height={200}
                  draggable={true}
                  className="miro-draggable draggable-item"
                />
              </Suspense>
          )} */}
          { dalleImage == undefined && loading == false ? null : (
            loading === true ? (
              <Loading />
            ) : (
              <Image
                src={dalleImage}
                alt="this is an generated Image"
                width={200}
                height={200}
                draggable={true}
                className="miro-draggable draggable-item"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
