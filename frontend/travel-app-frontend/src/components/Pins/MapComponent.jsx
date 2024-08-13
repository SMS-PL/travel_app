import React from 'react';

const MapComponent = ({ lat, lng }) => {

    return (
        <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d999499.3418762151287!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDEyJzQ2LjAiTiAyMsKwNDEnNTcuNSJF!5e0!3m2!1spl!2spl!4v1717069975723!5m2!1spl!2spl`} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="max-w-full w-[800px] max-h-full h-[500px] rounded-xl border bg-card text-card-foreground shadow"
        >
        </iframe>
        
    )
}

export default MapComponent;
