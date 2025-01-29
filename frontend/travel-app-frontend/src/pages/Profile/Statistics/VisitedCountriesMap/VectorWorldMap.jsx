import React from 'react';
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

const VectorWorldMap = ({userCountry}) => {
    const countryValues = userCountry.content.reduce((acc, item) => {
        acc[item.country.iso] = "#3b82f6";
        return acc;
    }, {});
    
    return (
        <div className="w-full h-[500px] rounded-lg">
            <VectorMap 
                className="rounded-xl z-[99]"
                map={worldMill}
                containerStyle={{
                    width: "800px",
                    height: "500px",
                }}
                backgroundColor=""
                regionStyle={{
                    initial: {
                        fill: "grey"
                    },
                    selected: {
                        fill: "#8B0000"
                    }
                }}
                series={{
                    regions: [
                        {
                            values: countryValues,
                            attribute: "fill"
                        }
                    ]
                }}
                onRegionTipShow={function (event, label, code, ...props) {
                    label.html(
                        `<div style='
                            position: absolute; 
                            margin-left: 20px; 
                            height: fit; 
                            width: fit; 
                            z-index: 99; 
                            background-color: 
                            hsl(var(--secondary)); 
                            padding: 5px 10px; 
                            border-radius: 25px; 
                            color: hsl(var(--primary)); 
                            font-weight: bold; 
                            text-wrap: nowrap;'>` +
                            label.html() +
                        "</div>"
                    );
                  }}
            />
        </div>
    )
}

export default VectorWorldMap;
