function changeStyles() {

    const styleSlider = document.getElementById('styleSlider');
    const body = document.body;

    // Remove existing classes
    body.classList.remove('bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7');

    const styleIndex = styleSlider.value;

    // Switching background classes based on the slider value
    switch (styleIndex) {
        case '1':
            body.classList.add('bg1');
            break;
        case '2':
            body.classList.add('bg2');
            break;
        case '3':
            body.classList.add('bg3');
            break;
        case '4':
            body.classList.add('bg4');
            break;
        case '5':
            body.classList.add('bg5');
            break;
        case '6':
            body.classList.add('bg6');
            break;
        case '7':
            body.classList.add('bg7');
            break;
        default:
            body.classList.add('background-light');
    }

    // Update text font-family based on the slider value
    const marqueetext = document.querySelector('.marquee');
    const hrline = document.querySelector('.hrl');
    const rect = document.querySelector('.rectangle');
    const mbg = document.querySelector('.marquee-background');
    const header1 = document.querySelector('.heading1');
    const header1bg = document.querySelector('.h1');
    const infot1 = document.querySelector('.info1');
    const infot2 = document.querySelector('.info2');
    const infot3 = document.querySelector('.info3');
    const infot4 = document.querySelector('.info4');
    const header2 = document.querySelector('.flex-container2');
    const header2bg = document.querySelector('.h2');
    const header3bg = document.querySelector('.h3');
    const url = document.querySelector('.urls');
    const url1 = document.querySelector('.urls1');
    const url2 = document.querySelector('.urls2');
    const slid = document.querySelector('.slider');
    const hoverr1 = document.getElementById('hover1');
    const hoverr2 = document.getElementById('hover2');
    const hoverr3 = document.getElementById('hover3');

    switch (styleIndex) {
        case '1':
            marqueetext.style.fontFamily = 'Coolvetica';
            marqueetext.style.fontSize = "100%";
            marqueetext.style.color = "black";
            marqueetext.style.top = "auto";

            hrline.style.borderColor = '#eb6738';
            hrline.style.backgroundColor = '#eb6738';

            mbg.style.backgroundColor = "#fdeecc";

            rect.style.borderColor = "#eb6738";
            rect.style.borderRadius = "18px";
            rect.style.backgroundColor = "#fefae2";
            rect.style.color = "black";

            header1.style.fontFamily = 'Garnett Semibold';
            header1bg.style.backgroundColor = "#fdeecc";
            header1bg.style.color = 'black';
            header1bg.style.borderRadius = "18px";
            header1bg.style.borderColor = 'black';

            infot1.style.fontFamily = 'NeueMontreal-Medium';
            infot1.style.fontSize = "85%";
            infot2.style.fontFamily = 'NeueMontreal-Medium';
            infot2.style.fontSize = "85%";
            infot3.style.fontFamily = 'NeueMontreal-Medium';
            infot3.style.fontSize = "85%";
            infot4.style.fontFamily = 'NeueMontreal-Medium';
            infot4.style.fontSize = "85%";

            header2.style.fontFamily = 'Garnett Semibold';

            url.style.color = 'black';
            url1.style.color = 'black';
            url2.style.color = 'black';

            header2bg.style.backgroundColor = "#fdeecc";
            header2bg.style.borderColor = 'black';
            header2bg.style.borderRadius = "18px";

            header3bg.style.backgroundColor = "#fdeecc";
            header3bg.style.borderColor = 'black';
            header3bg.style.borderRadius = "18px";

            slid.style.borderColor = "black";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#eb6738';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = 'black';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#eb6738';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = 'black';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#eb6738';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = 'black';
            });

            break;
        case '2':
            marqueetext.style.fontFamily = 'New Spirit Bold Condensed';
            marqueetext.style.fontSize = "94.5%";
            marqueetext.style.color = "#4c4c4c";
            marqueetext.style.top = "auto";

            hrline.style.borderColor = '#4c4c4c';
            hrline.style.backgroundColor = '#4c4c4c';

            mbg.style.backgroundColor = "#e0dbce";

            rect.style.borderColor = "#4c4c4c";
            rect.style.borderRadius = "18px";
            rect.style.backgroundColor = "#f5f2ea";
            rect.style.color = "#4c4c4c";

            header1.style.fontFamily = 'Sohne-Fett';
            header1bg.style.backgroundColor = "#e0dbce";
            header1bg.style.color = '#4c4c4c';
            header1bg.style.borderRadius = "18px";
            header1bg.style.borderColor = '#4c4c4c';

            infot1.style.fontFamily = 'PPPangramSansRounded-Bold';
            infot1.style.fontSize = "82.5%";
            infot2.style.fontFamily = 'PPPangramSansRounded-Bold';
            infot2.style.fontSize = "82.5%";
            infot3.style.fontFamily = 'PPPangramSansRounded-Bold';
            infot3.style.fontSize = "82.5%";
            infot4.style.fontFamily = 'PPPangramSansRounded-Bold';
            infot4.style.fontSize = "82.5%";

            header2.style.fontFamily = 'Sohne-Fett';

            url.style.color = '#4c4c4c';
            url1.style.color = '#4c4c4c';
            url2.style.color = '#4c4c4c';

            header2bg.style.backgroundColor = "#e0dbce";
            header2bg.style.borderColor = '#4c4c4c';
            header2bg.style.borderRadius = "18px";

            header3bg.style.backgroundColor = "#e0dbce";
            header3bg.style.borderColor = '#4c4c4c';
            header3bg.style.borderRadius = "18px";

            slid.style.borderColor = "#4c4c4c";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#94b1b1';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = '#4c4c4c';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#94b1b1';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = '#4c4c4c';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#94b1b1';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = '#4c4c4c';
            });

            break;
        case '3':
            marqueetext.style.fontFamily = 'W95FA';
            marqueetext.style.fontSize = "120%";
            marqueetext.style.color = "white";
            marqueetext.style.top = "19px";

            hrline.style.borderColor = '#2c65f0';
            hrline.style.backgroundColor = '#2c65f0';

            mbg.style.backgroundColor = "#2c65f0";

            rect.style.borderColor = "#2c65f0";
            rect.style.borderRadius = "0px";
            rect.style.backgroundColor = "#eceadb";
            rect.style.color = "#4c4c4c";

            header1.style.fontFamily = 'Andale Mono';
            header1bg.style.backgroundColor = "#eceadb";
            header1bg.style.color = 'black';
            header1bg.style.borderRadius = "0px";
            header1bg.style.borderColor = 'black';

            infot1.style.fontFamily = 'IBM Plex Mono Medium';
            infot1.style.fontSize = "73.5%";
            infot2.style.fontFamily = 'IBM Plex Mono Medium';
            infot2.style.fontSize = "73.5%";
            infot3.style.fontFamily = 'IBM Plex Mono Medium';
            infot3.style.fontSize = "73.5%";
            infot4.style.fontFamily = 'IBM Plex Mono Medium';
            infot4.style.fontSize = "73.5%";

            header2.style.fontFamily = 'Andale Mono';

            url.style.color = '#4c4c4c';
            url1.style.color = 'black';
            url2.style.color = 'black';

            header2bg.style.backgroundColor = "#eceadb";
            header2bg.style.borderColor = 'black';
            header2bg.style.borderRadius = "0px";

            header3bg.style.backgroundColor = "#eceadb";
            header3bg.style.borderColor = 'black';
            header3bg.style.borderRadius = "0px";

            slid.style.borderColor = "#2c65f0";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#2c65f0';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = '#4c4c4c';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#2c65f0';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = 'black';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#2c65f0';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = 'black';
            });

            break;
        case '4':
            marqueetext.style.fontFamily = 'Aileron';
            marqueetext.style.fontSize = "100%";
            marqueetext.style.color = "black";
            marqueetext.style.top = "10px";

            hrline.style.borderColor = '#aeaeae';
            hrline.style.backgroundColor = '#aeaeae';

            mbg.style.backgroundColor = "#d7d7d7";

            rect.style.borderColor = "#aeaeae";
            rect.style.borderRadius = "5px";
            rect.style.backgroundColor = "#e7ebef";
            rect.style.color = "#4c4c4c";

            header1.style.fontFamily = 'Aileron';
            header1bg.style.backgroundColor = "#b8d0e3";
            header1bg.style.color = 'black';
            header1bg.style.borderRadius = "5px";
            header1bg.style.borderColor = '#77899d';

            infot1.style.fontFamily = 'Inter';
            infot1.style.fontSize = "80%";
            infot2.style.fontFamily = 'Inter';
            infot2.style.fontSize = "80%";
            infot3.style.fontFamily = 'Inter';
            infot3.style.fontSize = "80%";
            infot4.style.fontFamily = 'Inter';
            infot4.style.fontSize = "80%";

            header2.style.fontFamily = 'Aileron';

            url.style.color = '#4c4c4c';
            url1.style.color = 'black';
            url2.style.color = 'black';

            header2bg.style.backgroundColor = "#b8d0e3";
            header2bg.style.borderColor = '#77899d';
            header2bg.style.borderRadius = "5px";

            header3bg.style.backgroundColor = "#b8d0e3";
            header3bg.style.borderColor = '#77899d';
            header3bg.style.borderRadius = "5px";

            slid.style.borderColor = "#77899d";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#77899d';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = '#4c4c4c';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#77899d';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = 'black';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#77899d';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = 'black';
            });

            break;
        case '5':
            marqueetext.style.fontFamily = 'FatFrank';
            marqueetext.style.fontSize = "100%";
            marqueetext.style.color = "#4a5841";
            marqueetext.style.top = "12px";

            hrline.style.borderColor = '#7d4a33';
            hrline.style.backgroundColor = '#7d4a33';

            mbg.style.backgroundColor = "#daa768";

            rect.style.borderColor = "#7d4a33";
            rect.style.borderRadius = "18px";
            rect.style.backgroundColor = "#f5dfc4";
            rect.style.color = "#7d4a33";

            header1.style.fontFamily = 'Gill Sans';
            header1bg.style.backgroundColor = "#daa768";
            header1bg.style.color = 'black';
            header1bg.style.borderRadius = "18px";
            header1bg.style.borderColor = '#7d4a33';

            infot1.style.fontFamily = 'Frutiger';
            infot1.style.fontSize = "80%";
            infot2.style.fontFamily = 'Frutiger';
            infot2.style.fontSize = "80%";
            infot3.style.fontFamily = 'Frutiger';
            infot3.style.fontSize = "80%";
            infot4.style.fontFamily = 'Frutiger';
            infot4.style.fontSize = "80%";

            header2.style.fontFamily = 'Gill Sans';

            url.style.color = '#7d4a33';
            url1.style.color = 'black';
            url2.style.color = 'black';

            header2bg.style.backgroundColor = "#daa768";
            header2bg.style.borderColor = '#7d4a33';
            header2bg.style.borderRadius = "18px";

            header3bg.style.backgroundColor = "#daa768";
            header3bg.style.borderColor = '#7d4a33';
            header3bg.style.borderRadius = "18px";

            slid.style.borderColor = "#7d4a33";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#4a5841';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = '#7d4a33';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#4a5841';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = 'black';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#4a5841';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = 'black';
            });

            break;
        case '6':
            marqueetext.style.fontFamily = 'Graphik';
            marqueetext.style.fontSize = "110%";
            marqueetext.style.color = "#212529";
            marqueetext.style.top = "12px";

            hrline.style.borderColor = '#343a40';
            hrline.style.backgroundColor = '#343a40';

            mbg.style.backgroundColor = "#e9ecef";

            rect.style.borderColor = "#343a40";
            rect.style.borderRadius = "18px";
            rect.style.backgroundColor = "#f8f9fa";
            rect.style.color = "#212529";

            header1.style.fontFamily = 'Graphik';
            header1bg.style.backgroundColor = "#e9ecef";
            header1bg.style.color = 'black';
            header1bg.style.borderRadius = "18px";
            header1bg.style.borderColor = '#343a40';

            infot1.style.fontFamily = 'Graphik';
            infot1.style.fontSize = "87.5%";
            infot2.style.fontFamily = 'Graphik';
            infot2.style.fontSize = "87.5%";
            infot3.style.fontFamily = 'Graphik';
            infot3.style.fontSize = "87.5%";
            infot4.style.fontFamily = 'Graphik';
            infot4.style.fontSize = "87.5%";

            header2.style.fontFamily = 'Graphik';

            url.style.color = '#212529';
            url1.style.color = 'black';
            url2.style.color = 'black';

            header2bg.style.backgroundColor = "#e9ecef";
            header2bg.style.borderColor = '#343a40';
            header2bg.style.borderRadius = "18px";

            header3bg.style.backgroundColor = "#e9ecef";
            header3bg.style.borderColor = '#343a40';
            header3bg.style.borderRadius = "18px";

            slid.style.borderColor = "#343a40";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#77899d';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = '#212529';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#77899d';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = 'black';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#77899d';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = 'black';
            });

            break;
        case '7':
            marqueetext.style.fontFamily = 'Halyard Display';
            marqueetext.style.fontSize = "100%";
            marqueetext.style.color = "#f8f9fa";
            marqueetext.style.top = "12px";

            hrline.style.borderColor = '#212121';
            hrline.style.backgroundColor = '#212121';

            mbg.style.backgroundColor = "#121212";

            rect.style.borderColor = "#212121";
            rect.style.borderRadius = "18px";
            rect.style.backgroundColor = "#121212";
            rect.style.color = "#f8f9fa";

            header1.style.fontFamily = 'Halyard Display';
            header1bg.style.backgroundColor = "#e9ecef";
            header1bg.style.color = 'black';
            header1bg.style.borderRadius = "18px";
            header1bg.style.borderColor = '#343a40';

            infot1.style.fontFamily = 'Helvetica Neue';
            infot1.style.fontSize = "80.5%";
            infot2.style.fontFamily = 'Helvetica Neue';
            infot2.style.fontSize = "80.5%";
            infot3.style.fontFamily = 'Helvetica Neue';
            infot3.style.fontSize = "80.5%";
            infot4.style.fontFamily = 'Helvetica Neue';
            infot4.style.fontSize = "80.5%";

            header2.style.fontFamily = 'Halyard Display';

            url.style.color = '#f8f9fa';
            url1.style.color = 'black';
            url2.style.color = 'black';

            header2bg.style.backgroundColor = "#e9ecef";
            header2bg.style.borderColor = '#343a40';
            header2bg.style.borderRadius = "18px";

            header3bg.style.backgroundColor = "#e9ecef";
            header3bg.style.borderColor = '#343a40';
            header3bg.style.borderRadius = "18px";

            slid.style.borderColor = "#343a40";

            hoverr1.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr1.style.color = '#77899d';
            });
            
            hoverr1.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr1.style.color = '#f8f9fa';
            });
            
            hoverr2.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr2.style.color = '#77899d';
            });
            
            hoverr2.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr2.style.color = 'black';
            });
            
            hoverr3.addEventListener('mouseover', () => {
                // Change style on hover
                hoverr3.style.color = '#77899d';
            });
            
            hoverr3.addEventListener('mouseout', () => {
                // Change style on mouseout
                hoverr3.style.color = 'black';
            });

            break;
        default:
            marqueetext.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
            header1.style.fontFamily = 'Arial, sans-serif';
            text3.style.fontFamily = 'Geneva, sans-serif';
    }
}