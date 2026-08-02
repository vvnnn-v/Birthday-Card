import { useEffect, useRef, useState } from "react";
import washiTape from "../assets/stickers/washi-tape.svg";

/** A small printed snapshot attached to the page — never the focus. */
export default function PhotoFrame({
  src,
  alt = "",
  caption = "",
  index = 0,
  tape = false,
  objectPosition,
}) {
  const [loaded, setLoaded] = useState(false);
  const filename = src ? src.split("/").pop() : "photo.jpg";
  const prevSrcRef = useRef(src);

  useEffect(() => {
    const changed = src !== prevSrcRef.current;
    prevSrcRef.current = src;
    if (changed) setLoaded(false);
  }, [src]);

  return (
    <figure
      className="photo-frame photo-frame--small"
      style={{ "--photo-tilt": `${index % 2 ? 0.6 : -0.75}deg` }}
    >
      {tape && (
        <img
          className="photo-frame__tape"
          src={washiTape}
          alt=""
          aria-hidden="true"
        />
      )}
      <div className="photo-frame__media">
        <div className="photo-frame__paper" aria-hidden={loaded}>
          <span className="photo-frame__filename">{filename}</span>
          <span className="photo-frame__hint">your photo will appear here</span>
        </div>
        {src && (
          <img
            className={`photo-frame__img ${loaded ? "photo-frame__img--loaded" : ""}`}
            src={src}
            alt={alt}
            loading="eager"
            style={objectPosition ? { objectPosition } : undefined}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      {caption && (
        <figcaption className="photo-frame__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
