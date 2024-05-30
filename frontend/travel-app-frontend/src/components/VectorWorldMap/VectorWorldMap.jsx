import React from 'react';
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

const VectorWorldMap = ({userCountry}) => {
    const countryValues = userCountry.content.reduce((acc, item) => {
        acc[item.country.iso] = "#3b82f6";
        return acc;
    }, {});
    
    return (
        <div className="w-[700px] h-[500px] rounded-lg">
            <VectorMap 
                className="rounded-xl"
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
                // onRegionTipShow={function (event, label, code, ...props) {
                //     label.html(
                //       '<div style="background-color: white; z-index: 49; border: 1px solid white; outline: 10px solid white; border-radius: 6px; min-height: 70px; width: 150px; color: black"; padding-left: 10px>' +
                //         "<p>" +
                //         "<b>" +
                //         label.html() +
                //         "</b>" +
                //         "</p>" +
                //         "<p>" +
                //         "Count: " +
                //         "<b>" +
                //         "</b>" +
                //         "</p>" +
                //         "</div>"
                //     );
                //   }}
            />
        </div>
    )
}

export default VectorWorldMap;
