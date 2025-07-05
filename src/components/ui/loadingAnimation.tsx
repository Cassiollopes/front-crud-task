export default function LoadingAnimation({
  condition,
  top = false,
}: {
  condition: boolean;
  top?: boolean;
}) {
  return (
    <div
      className="animate-fade-in opacity-0 z-[46]"
      style={{ animationDelay: "0ms", animationDuration: "150ms" }}
    >
      <div
        className={`absolute top-0 left-0 right-0 ${!top ? "bottom-0" : ""} flex items-center justify-center ${
          condition ? "opacity-100" : "opacity-0 invisible"
        } transition-all ease-linear`}
      >
        <svg width="60" height="60" viewBox="0 0 50 50">
          <g fill="none" stroke="#60A5FA">
            <g transform="rotate(0 25 25)">
              <ellipse
                cx="25"
                cy="25"
                rx="15"
                ry="8"
                strokeWidth="2"
                opacity="0.3"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
            <g transform="rotate(120 25 25)">
              <ellipse
                cx="25"
                cy="25"
                rx="15"
                ry="8"
                strokeWidth="2"
                opacity="0.5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
            <g transform="rotate(240 25 25)">
              <ellipse
                cx="25"
                cy="25"
                rx="15"
                ry="8"
                strokeWidth="2"
                opacity="0.7"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
            <circle cx="25" cy="25" r="3" fill="#60A5FA">
              <animate
                attributeName="r"
                values="3;4;3"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
}
