import { useEffect } from "react";
function Script({ src, id, strategy, onLoad, onReady, onError, dangerouslySetInnerHTML, children, ...rest }) {
  useEffect(() => {
    if (src) {
      if (id && document.getElementById(id)) {
        if (onReady) onReady();
        return;
      }
      const s = document.createElement("script");
      if (id) s.id = id;
      s.src = src;
      s.async = true;
      for (const k of Object.keys(rest)) {
        try {
          s.setAttribute(k.toLowerCase(), String(rest[k]));
        } catch {
        }
      }
      if (onLoad) s.addEventListener("load", onLoad);
      if (onError) s.addEventListener("error", onError);
      document.head.appendChild(s);
      return () => {
        try {
          s.remove();
        } catch {
        }
      };
    } else if (dangerouslySetInnerHTML && dangerouslySetInnerHTML.__html) {
      const s = document.createElement("script");
      if (id) s.id = id;
      s.text = dangerouslySetInnerHTML.__html;
      document.head.appendChild(s);
      return () => {
        try {
          s.remove();
        } catch {
        }
      };
    } else if (children) {
      const s = document.createElement("script");
      if (id) s.id = id;
      s.text = typeof children === "string" ? children : String(children);
      document.head.appendChild(s);
      return () => {
        try {
          s.remove();
        } catch {
        }
      };
    }
  }, [src, id]);
  return null;
}
export {
  Script as default
};
