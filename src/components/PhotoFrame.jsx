import { useEffect, useState } from "react";

/** A stable paper frame: the placeholder stays visible until a real photo has loaded. */
export default function PhotoFrame({ src, alt = "", caption = "", index = 0 }) {
  const [loaded, setLoaded] = useState(false);
  const filename = src ? src.split("/").pop() : "photo.jpg";

  useEffect(() => setLoaded(false), [src]);

  return (
    <figure className="photo-frame" style={{ "--photo-tilt": `${index % 2 ? 1.2 : -1.3}deg` }}>
      <div className="photo-frame__tape" aria-hidden="true" />
      <span className="photo-frame__corner photo-frame__corner--left" aria-hidden="true" />
      <span className="photo-frame__corner photo-frame__corner--right" aria-hidden="true" />
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
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      {index === 2 && <span className="photo-frame__flower" aria-hidden="true">❀</span>}
      {index === 3 && <span className="photo-frame__duck" aria-hidden="true">♒</span>}
      {caption && <figcaption className="photo-frame__caption">{caption}</figcaption>}
    </figure>
  );
}
