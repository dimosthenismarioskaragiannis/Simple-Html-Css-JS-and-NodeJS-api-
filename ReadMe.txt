This is a simple "Ecommerce" website created with plain old Html Css and Javascript. It is served by a Node JS api.. 
There is nothing fancy about this project, nor it demonstrates any skill , the only reason it is here its due to emotional attachment,
 as it was my first experience developing a "fullstack web app". Found it randomly in one of my local folders, and i would like to pay my respects to this assignment,
as it made me love web development.







(Η εργασία υλοποιήθηκε με χρήση nodejs με express framework.
O nodejs server μας εχει υλοποιηθει στο αρχειο app.js
Για την σωστη προβολη των αρχειων πρώτα τρέξτε τον σερβερ με node app.js
O client javascript code υλοποιηθηκε μεσα σε script tags στα html αρχεια.

Κατα την φορτωση καθε αρχειου πρωτα ελεγχεται αν ο χρηστης ειναι logged in μεσω των cookies και σε συνδυασμο με κληση fetch στο /auth endpoint του σερβερ μας.
Αν βρεθει sessionid και username επιστρεφεται. Επισης διαγραφεται η φορμα loggin και στην θεση της προστιθονται στοιχεια οπως το view my cart και logout

Ο ελεγχος των στοιχειων loggin γινεται με fetch post στο / endpoint  που υλοποιειται σε script προς το τελος του καθε αρχειου. Σε επιτυχη loggin στελνουμε ενα cookie me sessionid, καθως και τα δεδομενα συνδεσης
username και sessionid. Κατοπιν αυτου γινεται refresh ώστε να κληθεί το endpoint /auth και να διαγραφει η φορμα login.

Οι καταχωρημενοι users einai   {username:admin, password:admin} {username:dimosthenis,password:123456789} {username:marios,password:987654321} {username:examiner,password:326159487}

Με αυτο τον τροπο που υλοποιησαμε το auth μπορει να διατηρηθει το login session σε περιπτωση που γινει refresh η αλλαξουμε σελιδα, και χωρις να χρειαστει να περναμε το sessionid σαν url parameter.
)
