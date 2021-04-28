var export_txt = "# CSV Anki import";

function get_all_flashcards() {
    //var textToSave = document.getElementById('txt').innerHTML;

    console.log('>>');
    
    $.each($("blockquote > blockquote > blockquote"), function() {
        
        // New line
        export_txt = export_txt + '\n'
        
        // Question
        console.log("-- Question");
        var i = 0;
        
        $(this).parent().children('p').each(function() {
            console.log($(this).html());
            
            // FIELD 1: ID
            if (i == 0) {
                export_txt = export_txt + $(this).html() + ';';
            }
            // FIELD 2: QUESTION
            else {
                // Check if <br> is needed
                if (i > 1) {
                export_txt = export_txt + '<br>';
                }
                
                export_txt = export_txt + $(this).html();
            }

            i = i + 1;
        });
        
        
        // Answer
        console.log("-- Answer");
        var i = 0;
        
        $(this).children('p').each(function() {
            console.log($(this).html());
            
            // Check if <br> is needed
            if (i > 0) {
                export_txt = export_txt + '<br>';
            }
            export_txt = export_txt + ';' + $(this).html();
            i = i + 1;
        });
    });

    console.log(export_txt);
    download_txt();
}


function  download_txt() {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob([export_txt], {type: "text/plain" })
  );

  // Use download attribute to set set desired file name
  a.setAttribute("download", 'myFile.txt');

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

$(document).ready(function() {
    document.getElementById('btn_dowload').addEventListener('click', get_all_flashcards);
});
