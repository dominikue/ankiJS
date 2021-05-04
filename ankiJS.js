var export_basic = "# BASIC DECK :: CSV AnkiJS - Import for ";
var export_cloze = "# CLOZE DECK :: CSV AnkiJS - Import for ";


function get_all_flashcards() {

    export_basic += $(document).attr('title');
    export_cloze += $(document).attr('title');
    
    $.each($('body > blockquote > blockquote'), function() {
        
        // Note text var for exporting with new line
        var note_txt = "\n";

        if ($(this).find('blockquote').length) {
            // -- IF BASIC with question and answer --
            
            // QUESTION
            var q_i = 0;
            
            $(this).children('p').each(function() {
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
            
            $(this).find('blockquote').children().each(function() {
                
                // Check if answer has multiple lines (<br>)
                if (a_i > 0) {
                    note_txt += '<br>';
                }
                
                //if q / ul
                if ($(this).is('ul')){
                    var q_txt = '<ul>' + $(this).html() + '</ul>'
                } else {
                    var q_txt = $(this).html()
                }
                q_txt = q_txt.replace(/(\r\n|\n|\r|\t)/gm, "");
                
                note_txt += q_txt;
                
                a_i = a_i + 1;
            });
            
            // REPLACING Chars
            console.log('BASIC:');
            console.log(note_txt);
            export_basic += note_txt;
            
        } else {
            // -- ELSE CLOZE with only question --
            
            // QUESTION with CLOZE
            var q_i = 0;
            var q_cloze_i = 0;
            
            $(this).children().each(function() {
                // FIELD 1: ID
                if (q_i == 0) {
                    note_txt += $(this).html() + ';';
                }
                // FIELD 2: QUESTION with cloze
                else {
                    // Check if question has multiple lines (<br>)
                    if (q_i > 1) {
                        note_txt += '<br>';
                    }
                    
                    //if q / ul
                    if ($(this).is('ul')){
                        var q_txt = '<ul>' + $(this).html() + '</ul>'
                    } else {
                        var q_txt = $(this).html()
                    }
                    q_txt = q_txt.replace(/(\r\n|\n|\r|\t)/gm, "");

                    q_txt = q_txt.replace(/<cite>:[0-9]+ /gi, function (match) {
                        console.log('MATCH:');
                        match = match.substring(0, match.length - 1);
                        match = match.replace('<cite>:', '');
                        console.log('MATCH:');
                        console.log(match);
                        return '{{c' +  match + '::';
                    });

                    q_txt = q_txt.replace(/<cite>/gi, function() {
                        q_cloze_i++;
                        return '{{c' + q_cloze_i + '::'
                    });
                    
                    q_txt = q_txt.replace(/<\/cite>/gi, '}}');
                    
                    console.log(q_txt);
                    note_txt += q_txt;
                }
                q_i = q_i + 1;
            });
            
            console.log('CLOZE:');
            console.log(note_txt);
            export_cloze += note_txt;
        }
        
                
        
    });
    
    download_txt(export_basic, 'BASIC_');
    download_txt(export_cloze, 'CLOZE_');
}


function  download_txt(export_text, prefix) {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob([export_text], {type: "text/plain" })
  );

  // Use download attribute to set set desired file name
  a.setAttribute("download", prefix + $(document).attr('title') + '_anki.txt');

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}


$(document).ready(function() {
    document.getElementById('btn_dowload').addEventListener('click', get_all_flashcards);
});
