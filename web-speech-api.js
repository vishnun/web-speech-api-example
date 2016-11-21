var recognition;

if (window.webkitSpeechRecognition) {
    recognition = new webkitSpeechRecognition();
    var stop = false;

    var words = ["testing", "try", "speech", "lab", "history", "geography", "emergence"];
    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.onresult = function(event) {
        var i;
        return $('#transcript').text($('#transcript').text() + ((function() {
            var j, ref, ref1, results;
            var showResults = []
            results = [];
            for (i = j = ref = event.resultIndex, ref1 = event.results.length - 1; j <= ref1; i = j += 1) {
                var transcript = event.results[i][0].transcript;
                if(event.results[i].isFinal == true) {
                    showResults.push(transcript);
                }
                results.push(transcript);
            }

            var wordList = $('#word-list').children();
            var existingWords = []
            wordList.toArray().forEach(function(el) {
                existingWords.push($(el).text());
            })

            results.forEach(function(result) {
                words.forEach(function(word) {
                    if(result.indexOf(word) != -1){
                        if(existingWords.indexOf("word") == -1){
                            $("#word-list").append("<li>"+word+"</li>");
                        }   
                    }
                });
               
            });

            return showResults;
        })()).join(''));
    };

    recognition.onend = function() {
        console.log('Speech recognition service disconnected');
        console.log('starting again...');
        if (!stop) {
            recognition.start();
            recognition.continuous = false;
        }
    };
    $('#startStopButton').on('click', function() {
        if (this.innerText === 'Start') {
            this.innerText = 'Stop';
            recognition.lang = 'en-AU';
            return recognition.start();
        } else {
            this.innerText = 'Start';
            stop = true;
            return recognition.stop();
        }
    });



} else {
    alert('Cannot access the speech recognition API.  Are you using Chrome 25+ ?');
}