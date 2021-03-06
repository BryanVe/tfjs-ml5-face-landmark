import React, { useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import { load, SupportedPackages } from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { draw } from "../utils";
import { ColorPickerLayout } from "layout";

const useStyles = makeStyles(theme => ({
    header: {
        height: "80px",
        display: "table",
        textAlign: 'center',
        width: "100%"
    },
    title: {
        display:  "table-cell",
        verticalAlign: "middle",
        fontSize: "30px",
        fontWeight: 'bold'
    } ,
    card: {
        maxWidth: 200
    },
    camera: {
    }
}))

const FaceMask = (props) => {
    const classes = useStyles();
    const webcam = useRef(null);
    const canvas = useRef(null);
    // const colorState = useRef("#FFFFFF");
    const inputRef = React.createRef()

    useEffect(() => {
        const faceDetector = async () => {
            const model = await load(
                SupportedPackages.mediapipeFacemesh
                );
            detect(model);
            };
        faceDetector();
        
        const detect = async (model) => {
            if (!webcam.current || !canvas.current)
                return;
            
                const webcamCurrent = webcam.current;
            
            // if (webcamCurrent.video.readyState !== 4)
            //     detect(model);
            
            const video = webcamCurrent.video;

            if (video.readyState === 4) {
                const videoWidth = webcamCurrent.video.videoWidth;
                const videoHeight = webcamCurrent.video.videoHeight;
                canvas.current.width = videoWidth;
                canvas.current.height = videoHeight;
                const predictions = await model.estimateFaces({
                    input: video
                });
                if(canvas.current!==null) {
                    const ctx = canvas.current.getContext("2d");
                    requestAnimationFrame(() => {
                        const color = inputRef.current.value ? inputRef.current.value : '#FFF'
    
                        draw(predictions, ctx, videoWidth, videoHeight, color);
                    });
                }
                detect(model);
            }
    };
    },[inputRef]);
    
    return (
        <div className="{classes.root}">
            <header className={classes.header}>
                <div className={classes.title}>Seguimiento de rostro en tiempo real aplicado a la creaci??n de m??scaras</div>
            </header>
            <div className = {classes.card}>
                <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Elige un color para tu mascara
                    </Typography>
                    </CardContent>
                    <CardContent>
                    <div className="{classes.picker}">
                    <div className={classes.root}>
                        {/* <Container>
                            <input type="color" onChange={handleInput} value={colorState.current}/>
                            <input type="text" onChange={handleInput} value={colorState.current} />
                        </Container> */}
                        <ColorPickerLayout
                            ref={inputRef}
                        />
                        </div>
                    </div>
                    </CardContent>
                </Card>

            </div>
            <div className={classes.camera}>
                <Webcam
                    audio={false}
                    ref={webcam}
                    style={{
                    position: "absolute",
                    textAlign: "center",
                    margin: 'auto',
                    top: 100,
                    left: 0,
                    right: 0,
                    zIndex: 1
                    }}
                />
                <canvas
                    ref={canvas}
                    style={{
                    position: "absolute",
                    textAlign: "center",
                    margin: 'auto',
                    top: 100,
                    left: 0,
                    right: 0,
                    zIndex: 2
                    }}
                />
            </div>
        </div>
    );
};
export default FaceMask;