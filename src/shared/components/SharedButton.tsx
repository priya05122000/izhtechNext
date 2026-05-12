import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface ShareProps {
  title?: string;
  imageUrl: string;
}

const SharedButton = ({ title, imageUrl }: ShareProps) => {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);

      if (imageUrl) {
        fetch(imageUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "shared-image.jpg", { type: blob.type });
            setFile(file);
          })
          .catch(err => console.error("Image fetch failed:", err));
      }
    }
  }, [imageUrl]);

  const formattedTitle = title?.trim() || "Check this out!";
  console.log("formattedTitle", formattedTitle);

  const handleWebShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedLink = (e.target as HTMLElement).closest("a");
    if (clickedLink) return;

    if (!navigator.share) {
      alert("Web Share API is not supported in this browser.");
      return;
    }

    try {
      const shareData: ShareData = {
        title: formattedTitle,
        url,
      };

      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        shareData.files = [file];
      }

      await navigator.share(shareData);
    } catch (err) {
      console.error("Error sharing:", err);
      alert("Sharing failed or was cancelled.");

    }
  };

  return (
    <StyledWrapper>

      <button
        className="btn-cssbuttons "
        onClick={handleWebShare}
        role="button"
        aria-label="Share"
      >
        <span>Share</span>
        <span><svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
        </svg>
        </span>

        {formattedTitle && url && (
          <ul>
            <li>
              {/* <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebookF />
              </a> */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(formattedTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                </svg>

              </a>

            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(formattedTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                title="Twitter (X)"
              >
                <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                </svg>

              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(formattedTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd" />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>

              </a>
            </li>
          </ul>
        )}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-cssbuttons {
    position: relative;
    padding: 9px 18px;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    width: 100px;
    font-size: 14px;
    line-height: 1;
    color: #000000;
    background: white;
    border: none;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s ease;
    border: 1px solid #6885FF;
    border-radius: 50px;
    display: flex;
    align-items:center;
  }

  .btn-cssbuttons::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: var(--btn-color, #e0eaff);
    z-index: -1;
    border-radius: 24px;
    transition: 0.3s ease;
  }

  .btn-cssbuttons span,
  .btn-cssbuttons span span {
    display: inline-flex;
    vertical-align: middle;
    transition: 0.3s ease;
  }

  .btn-cssbuttons span:first-child {
    padding-right: 7px;
  }

  .btn-cssbuttons span span {
    margin-left: 8px;
  }

  .btn-cssbuttons ul {
    position: absolute;
    top: 50%;
    left: 0; right: 0;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .btn-cssbuttons ul li {
    flex: 1;
    display: flex;
    justify-content: center;
    pointer-events: all;
  }

  .btn-cssbuttons ul li a {
    display: inline-flex;
    color: #000;
    transform: translateY(55px);
    transition: 0.3s ease;
  }

  .btn-cssbuttons ul li a:hover {
    opacity: 0.6;
  }

  .btn-cssbuttons:hover::before {
    transform: scale(1.2);
  }

  .btn-cssbuttons:hover span,
  .btn-cssbuttons:hover span span {
    transform: translateY(-55px);
  }

  .btn-cssbuttons:hover ul li a {
    transform: translateY(0);
  }

  .btn-cssbuttons:hover ul li:nth-child(1) a { transition-delay: 0.15s; }
  .btn-cssbuttons:hover ul li:nth-child(2) a { transition-delay: 0.2s; }
  .btn-cssbuttons:hover ul li:nth-child(3) a { transition-delay: 0.25s; }
`;

export default SharedButton;
