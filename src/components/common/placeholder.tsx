// .ui.placeholder{
//     position:static overflow:hidden;
//     -webkit-animation:placeholderShimmer 2s linear;
//     animation:placeholderShimmer 2s linear;
//     -webkit-animation-iteration-count:infinite;
//     animation-iteration-count:infinite;
//     background-color:#fff;
//     background-image:
//     -webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.08)),
//     color-stop(15%,rgba(0,0,0,.15)),
//     color-stop(30%,rgba(0,0,0,.08)));
//
//     background-image:
//         -webkit-linear-gradient(left,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
//     background-image:
//         linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
//     background-size: 1200px 100%;
//     max-width:30rem
// }
//     @-webkit-keyframes placeholderShimmer{0%{background-position:-1200px 0}100%{background-position:1200px 0}}
//     @keyframes placeholderShimmer{0%{background-position:-1200px 0}100%{background-position:1200px 0}}
//
// .ui.placeholder+.ui.placeholder{margin-top:2rem}.ui.placeholder+.ui.placeholder{-webkit-animation-delay:.15s;animation-delay:.15s}.ui.placeholder+.ui.placeholder+.ui.placeholder{-webkit-animation-delay:.3s;animation-delay:.3s}.ui.placeholder+.ui.placeholder+.ui.placeholder+.ui.placeholder{-webkit-animation-delay:.45s;animation-delay:.45s}.ui.placeholder+.ui.placeholder+.ui.placeholder+.ui.placeholder+.ui.placeholder{-webkit-animation-delay:.6s;animation-delay:.6s}.ui.placeholder,.ui.placeholder .image.header:after,.ui.placeholder .line,.ui.placeholder .line:after,.ui.placeholder>:before{background-color:#fff}.ui.placeholder .image:not(.header):not(.ui){height:100px}.ui.placeholder .square.image:not(.header){height:0;overflow:hidden;padding-top:100%}.ui.placeholder .rectangular.image:not(.header){height:0;overflow:hidden;padding-top:75%}.ui.placeholder .line{position:relative;height:.85714286em}.ui.placeholder .line:after,.ui.placeholder .line:before{top:100%;position:absolute;content:'';background-color:inherit}.ui.placeholder .line:before{left:0}.ui.placeholder .line:after{right:0}.ui.placeholder .line{margin-bottom:.5em}.ui.placeholder .line:after,.ui.placeholder .line:before{height:.5em}.ui.placeholder .line:not(:first-child){margin-top:.5em}.ui.placeholder .header{position:relative;overflow:hidden}.ui.placeholder .line:nth-child(1):after{width:0%}.ui.placeholder .line:nth-child(2):after{width:50%}.ui.placeholder .line:nth-child(3):after{width:10%}.ui.placeholder .line:nth-child(4):after{width:35%}.ui.placeholder .line:nth-child(5):after{width:65%}.ui.placeholder .header .line{margin-bottom:.64285714em}.ui.placeholder .header .line:after,.ui.placeholder .header .line:before{height:.64285714em}.ui.placeholder .header .line:not(:first-child){margin-top:.64285714em}.ui.placeholder .header .line:after{width:20%}.ui.placeholder .header .line:nth-child(2):after{width:60%}.ui.placeholder .image.header .line{margin-left:3em}.ui.placeholder .image.header .line:before{width:.71428571rem}.ui.placeholder .image.header:after{display:block;height:.85714286em;content:'';margin-left:3em}.ui.placeholder .header .line:first-child,.ui.placeholder .image .line:first-child,.ui.placeholder .paragraph .line:first-child{height:.01px}.ui.placeholder .header:not(:first-child):before,.ui.placeholder .image:not(:first-child):before,.ui.placeholder .paragraph:not(:first-child):before{height:1.42857143em;content:'';display:block}.ui.inverted.placeholder{background-image:-webkit-gradient(linear,left top,right top,from(rgba(255,255,255,.08)),color-stop(15%,rgba(255,255,255,.14)),color-stop(30%,rgba(255,255,255,.08)));background-image:-webkit-linear-gradient(left,rgba(255,255,255,.08) 0,rgba(255,255,255,.14) 15%,rgba(255,255,255,.08) 30%);background-image:linear-gradient(to right,rgba(255,255,255,.08) 0,rgba(255,255,255,.14) 15%,rgba(255,255,255,.08) 30%)}.ui.inverted.placeholder,.ui.inverted.placeholder .image.header:after,.ui.inverted.placeholder .line,.ui.inverted.placeholder .line:after,.ui.inverted.placeholder>:before{background-color:#1b1c1d}.ui.placeholder .full.line.line.line:after{width:0%}.ui.placeholder .very.long.line.line.line:after{width:10%}.ui.placeholder .long.line.line.line:after{width:35%}.ui.placeholder .medium.line.line.line:after{width:50%}.ui.placeholder .short.line.line.line:after{width:65%}.ui.placeholder .very.short.line.line.line:after{width:80%}
// .ui.fluid.placeholder{max-width:none}

import styled from "@emotion/styled";
import {css, keyframes} from "@emotion/react";

interface PropsStyle {
    height: string | number;
}

const placeholderShimmer = keyframes`
    0%{background-position:-1200px 0}
    100%{background-position:1200px 0}}
`

const PlaceholderStyle = ({height}:PropsStyle) => css`
    position:static overflow:hidden;
    animation:${placeholderShimmer} 2s linear;
    animation-iteration-count:infinite;
    background-color:#fff;
    background-image:
        -webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.08)),
        color-stop(15%,rgba(0,0,0,.15)),
        color-stop(30%,rgba(0,0,0,.08)));

    background-image:
        linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
    background-size: 1200px 100%;
    max-width:30rem;
    height: ${height + 'px'};
`;

const PlaceholderWrap = styled.div`${PlaceholderStyle}`

export default function PlaceholderZ(){
    return (
        <PlaceholderWrap height={300}>

        </PlaceholderWrap>
    )
}