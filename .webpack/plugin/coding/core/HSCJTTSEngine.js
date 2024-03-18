class HSCJTTSEngine{
    static speak(msg,enqueue=true,rate,pitch){
        const speakText = msg?.toString()??"";
        if((speakText?.length??0) === 0) return;

        let speaked = false;
        /*
        try {
            if (HSCJTTSEngine.voices !== undefined && HSCJTTSEngine.voices.length > 0) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.voice = HSCJTTSEngine.voices[0];
                utterance.volume = 1;
                utterance.rate = 1.25;
                utterance.pitch = 1;
                utterance.text = speakText;

                try {if (!enqueue) speechSynthesis.cancel();} catch (e) {}
                speechSynthesis.speak(utterance);
                speaked = true;
            }
        } catch (e) {}
        */

        if(!speaked){
            try {chrome?.tts?.speak(speakText, {enqueue: enqueue===true,rate,pitch});} catch (e) {}
        }
    }
}
/*
if(speechSynthesis !== undefined){
    HSCJTTSEngine.voices = speechSynthesis.getVoices();
}
*/
