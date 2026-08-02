import { useState } from "react";

/**
 * Polaroid-style photo frame with washi tape.
 *
 * Gracefully handles missing images: if the file doesn't exist yet,
 * it renders an elegant paper placeholder showing the expected
 * filename. Drop the real photo into public/assets/photos/ with the
 * same name and it appears automatically — no code changes needed.
 */
export default function PhotoFrame({ src, alt = "", caption = "" }) {
  const [missing, setMissing] = useState(false);

  if (!src || missing) {
    const filename = src ? src.split("/").pop() : "photo.jpg";
    return (
      <figure className="photo-frame photo-frame--placeholder">
        <div className="photo-frame__paper">
          <span className="photo-frame__filename">{filename}</span>
          <span className="photo-frame__hint">your photo will appear here</span>
        </div>
        {caption && <figcaption className="photo-frame__caption">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="photo-frame">
      <div className="photo-frame__tape" aria-hidden="true" />
      <img
        className="photo-frame__img"
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setMissing(true)}
      />
      {caption && <figcaption className="photo-frame__caption">{caption}</figcaption>}
    </figure>
  );
}