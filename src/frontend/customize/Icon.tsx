import React, { FC, Fragment } from 'react'

export type IconTypes =
    | 'calendar'
    | 'info-square'
    | 'file'
    | 'download-file'
    | 'arrow-down'
    | 'arrow-left'
    | 'close';

export type IconProps = {
    icon: IconTypes;
    width?: number;
    height?: number;
    withoutRestrictSize?: boolean;
};

const Icon: FC<IconProps> = ({
  icon,
  width = 16,
  height = 16,
  withoutRestrictSize,
}) => {
  const sizes = withoutRestrictSize ? undefined : { width, height }

  switch (icon) {
  case 'calendar':
    return (
      <svg
        {...sizes}
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.09277 8.40421H18.9167"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.442 12.3097H14.4512"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0045 12.3097H10.0137"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.55769 12.3097H5.56695"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.442 16.1962H14.4512"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0045 16.1962H10.0137"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.55769 16.1962H5.56695"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.0438 1V4.29078"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.96564 1V4.29078"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.2383 2.57922H5.77096C2.83427 2.57922 1 4.21516 1 7.22225V16.2719C1 19.3263 2.83427 21 5.77096 21H14.229C17.175 21 19 19.3546 19 16.3475V7.22225C19.0092 4.21516 17.1842 2.57922 14.2383 2.57922Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  case 'info-square':
    return (
      <svg
        {...sizes}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9897 15.7962V11.3772"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9896 8.20435H11.9996"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

  case 'download-file':
    return (
      <svg
        {...sizes}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.7365 2.76196H8.08449C6.02549 2.76196 4.25049 4.43096 4.25049 6.49096V17.228C4.25049 19.404 5.90849 21.115 8.08449 21.115H16.0725C18.1325 21.115 19.8025 19.288 19.8025 17.228V8.03796L14.7365 2.76196Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4736 2.75024V5.65924C14.4736 7.07924 15.6226 8.23124 17.0426 8.23424C18.3586 8.23724 19.7056 8.23824 19.7966 8.23224"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6406 16.0138V9.4408"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.80225 13.1632L11.6402 16.0142L14.4792 13.1632"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  case 'file':
    return (
      <svg
        {...sizes}
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7161 14.2234H5.49609"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.7161 10.0369H5.49609"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.25109 5.86011H5.49609"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9085 0.749756C12.9085 0.749756 5.23149 0.753756 5.21949 0.753756C2.45949 0.770756 0.750488 2.58676 0.750488 5.35676V14.5528C0.750488 17.3368 2.47249 19.1598 5.25649 19.1598C5.25649 19.1598 12.9325 19.1568 12.9455 19.1568C15.7055 19.1398 17.4155 17.3228 17.4155 14.5528V5.35676C17.4155 2.57276 15.6925 0.749756 12.9085 0.749756Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  case 'arrow-down':
    return (
      <svg
        {...sizes}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 8.5L12 15.5L5 8.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  case 'arrow-left':
    return (
      <svg {...sizes} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.25 12.2744L19.25 12.2744"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

  case 'close':
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29303 5.29357C5.48056 5.1061 5.73487 5.00078 6.00003 5.00078C6.26519 5.00078 6.5195 5.1061 6.70703 5.29357L12 10.5866L17.293 5.29357C17.3853 5.19806 17.4956 5.12188 17.6176 5.06947C17.7396 5.01706 17.8709 4.98947 18.0036 4.98832C18.1364 4.98717 18.2681 5.01247 18.391 5.06275C18.5139 5.11303 18.6255 5.18728 18.7194 5.28117C18.8133 5.37507 18.8876 5.48672 18.9379 5.60962C18.9881 5.73251 19.0134 5.86419 19.0123 5.99697C19.0111 6.12975 18.9835 6.26097 18.9311 6.38297C18.8787 6.50498 18.8025 6.61532 18.707 6.70757L13.414 12.0006L18.707 17.2936C18.8892 17.4822 18.99 17.7348 18.9877 17.997C18.9854 18.2592 18.8803 18.51 18.6948 18.6954C18.5094 18.8808 18.2586 18.986 17.9964 18.9882C17.7342 18.9905 17.4816 18.8897 17.293 18.7076L12 13.4146L6.70703 18.7076C6.51843 18.8897 6.26583 18.9905 6.00363 18.9882C5.74143 18.986 5.49062 18.8808 5.30521 18.6954C5.1198 18.51 5.01463 18.2592 5.01236 17.997C5.01008 17.7348 5.11087 17.4822 5.29303 17.2936L10.586 12.0006L5.29303 6.70757C5.10556 6.52004 5.00024 6.26573 5.00024 6.00057C5.00024 5.73541 5.10556 5.4811 5.29303 5.29357Z"
          fill="currentColor"
          fillOpacity="0.38"
        />
      </svg>
    )

  default:
    return <Fragment />
  }
}

export { Icon as default, Icon }
