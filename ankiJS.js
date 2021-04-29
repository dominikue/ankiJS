var export_txt = "# CSV AnkiJS - Import for deck: ";

function get_all_flashcards() {

    export_txt += $(document).attr('title');
    
    $.each($("blockquote > blockquote > blockquote"), function() {
        
        // Note text var for exporting with new line
        var note_txt = "\n";
                
        // QUESTION
        var q_i = 0;
        
        $(this).parent().children('p').each(function() {
            // FIELD 1: ID
            if (q_i == 0) {
                note_txt += $(this).html() + ';';
            }
            // FIELD 2: QUESTION
            else {
                // Check if question has multiple lines (<br>)
                if (q_i > 1) {
                    note_txt += '<br>';
                }
                
                console.log($(this).html());
                
                note_txt += $(this).html();
            }
            q_i = q_i + 1;
        });
        
 
        // ANSWER
        note_txt += ";";
        var a_i = 0;
        
        $(this).children('p').each(function() {
            
            // Check if answer has multiple lines (<br>)
            if (a_i > 0) {
                note_txt += '<br>';
            }
            note_txt += $(this).html();
            
            a_i = a_i + 1;
        });
        
        // REPLACING Chars
        var note_txt = note_txt.replace(";", ","); // `;` to `,`
        console.log(note_txt);
        export_txt += note_txt;
    });
    
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
  a.setAttribute("download", $(document).attr('title') + '_anki.txt');

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

$(document).ready(function() {
    document.getElementById('btn_dowload').addEventListener('click', get_all_flashcards);
});
