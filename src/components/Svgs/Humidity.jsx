import React from 'react';
import {motion} from "framer-motion";
import {SvgHoc} from "./SvgHoc";

function Humidity({width = '25px', height = '25px', color, animations}) {
    return (
        <>

            <svg version="1.1"
                 viewBox="0 0 109.88 122.88"
                 width={width}
                 height={height}
                 fill={color}
            >
                <g>
                    <motion.path
                        {...animations}
                        fillRule={'evenodd'}
                        clipRule={'evenodd'}
                        d="M40.45,2.13c3.17,13.57,9.96,25.71,17.08,36.7c1.06-1.6,2.18-3.24,3.33-4.91c6.39-9.34,13.67-19.99,16.5-32.26 c0.26-1.15,1.4-1.86,2.55-1.6c0.82,0.19,1.42,0.82,1.6,1.59c2.85,12.21,10.12,22.86,16.51,32.21c6.35,9.3,11.87,17.39,11.87,25.08 c0,14.27-7.93,23.42-18.07,27.43c-3.53,1.4-7.33,2.16-11.15,2.29C75.43,135.98,0,134.23,0,83.39C0,62.59,32.31,37.36,40.45,2.13 L40.45,2.13z M60.08,42.7c10.49,15.69,20.87,28.96,20.87,40.69c0,0.34-0.02,0.66-0.02,0.99c3.2-0.16,6.37-0.81,9.31-1.98 c8.63-3.41,15.37-11.23,15.37-23.46c0-6.38-5.17-13.96-11.12-22.68c-5.39-7.9-11.39-16.69-15.06-26.72 c-3.66,10.09-9.67,18.88-15.07,26.77C62.87,38.51,61.41,40.64,60.08,42.7L60.08,42.7z M15.81,77.48c-0.2-2.26,1.46-4.25,3.72-4.46 c2.26-0.21,4.25,1.46,4.46,3.72c0.51,5.46,1.7,10.48,3.99,14.82c2.21,4.19,5.48,7.79,10.22,10.57c1.96,1.14,2.61,3.66,1.47,5.61 c-1.15,1.96-3.66,2.61-5.61,1.47c-6.17-3.62-10.45-8.32-13.34-13.82C17.88,90.03,16.42,83.97,15.81,77.48L15.81,77.48L15.81,77.48z"/>
                </g> 
            </svg>
        </>
    );
}

export default SvgHoc(Humidity);