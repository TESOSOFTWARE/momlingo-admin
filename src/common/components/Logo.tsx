import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
    <svg
    width="105"
    height="45"
    viewBox="0 0 105 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g transform="scale(0.0525)">
        <path
            d="M10325 6845 c-305 -49 -562 -177 -782 -388 -262 -252 -387 -537 -400
            -917 -14 -401 92 -699 330 -927 193 -185 454 -312 959 -468 389 -119 560 -191
            743 -309 310 -202 457 -510 424 -889 -36 -412 -330 -766 -729 -876 -254 -71
            -612 -40 -845 72 -292 141 -458 417 -498 825 l-11 122 -258 0 -258 0 0 -40 c0
            -133 42 -368 92 -509 73 -209 172 -365 338 -531 269 -270 575 -406 998 -442
            219 -18 461 8 662 73 104 34 297 133 400 206 115 83 285 251 363 360 79 111
            149 248 191 373 55 167 67 237 73 440 6 207 -11 347 -62 509 -120 378 -400
            678 -820 877 -142 67 -284 117 -580 205 -132 39 -283 87 -335 106 -311 116
            -487 250 -586 448 -55 112 -74 197 -74 347 0 243 70 424 229 591 92 97 172
            155 283 206 245 114 564 114 793 -1 194 -98 377 -298 455 -500 31 -81 60 -221
            60 -294 l0 -44 261 0 261 0 -7 98 c-25 362 -161 652 -423 903 -197 190 -408
            302 -677 361 -122 27 -440 34 -570 13z"
            fill="#000000"
        />
        <path
            d="M15950 6845 c-752 -83 -1403 -461 -1876 -1092 -180 -239 -342 -570
            -409 -836 -9 -34 -18 -70 -21 -80 -5 -16 10 -17 261 -15 l267 3 39 110 c179
            513 599 990 1087 1234 315 157 600 222 977 222 369 0 666 -67 969 -218 268
            -134 567 -379 756 -618 333 -421 488 -897 466 -1435 -22 -578 -233 -1043 -662
            -1461 -352 -343 -741 -537 -1209 -605 -163 -24 -477 -24 -638 0 -472 68 -870
            271 -1228 626 -204 203 -323 366 -439 605 -38 77 -85 193 -106 258 l-37 117
            -257 0 c-141 0 -259 -2 -262 -5 -7 -7 4 -54 44 -194 160 -561 568 -1093 1123
            -1463 133 -89 385 -218 521 -267 536 -195 1127 -221 1681 -76 349 92 688 265
            983 503 130 105 349 325 450 452 295 371 472 786 536 1260 24 171 24 519 0
            690 -78 578 -321 1063 -741 1485 -474 476 -1024 740 -1674 805 -137 13 -457
            11 -601 -5z"
            fill="#000000"
        />
        <path
            d="M747 6813 c-4 -3 -7 -109 -7 -235 l0 -228 590 0 590 0 0 -2330 0
            -2330 258 2 257 3 3 2328 2 2327 580 0 580 0 0 235 0 235 -1423 0 c-783 0
            -1427 -3 -1430 -7z"
            fill="#000000"
        />
    </g>
</svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}