import http from 'http'
import {v4} from 'uuid'


const port = 3000
const grades  = [
    {
    studentName : 'John Doe',
    subject : 'Math',
    grade : 8,
    },
];

const server = http.createServer((request, response) => {
   const {method, url} = request
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString ();
    })

    request.on("end", () => {
       const id = url.split('/')[2];

           if ( url === '/grades' && method === 'GET') {
       response.writeHead(200, {'Content-type ': 'application/json'}) 
         response.end(JSON.stringify(grades))
    } else if (url === ('/grades') && method === 'POST') {
      const { studentName, subject, grade } = JSON.parse(body);
      const newGrade = {id : v4 (), studentName, subject, grade };
      grades.push(newGrade);
      response.writeHead(201, {'Content-type': 'application/json'});
      response.end(JSON.stringify(newGrade));
    }  else if (url.starsWith === '/grades' && method === 'POST') {

      const { studentName, subject, grade } = JSON.parse(body);
        const gradesToUpdate = grades.find(g => g.id === id);
        if (gradesToUpdate) {
            gradesToUpdate.studentName = studentName;
            gradesToUpdate.subject = subject;
            gradesToUpdate.grade = grade;
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(gradesToUpdate));
        }
    } else if (url.starsWith === '/grades' && method === 'DELETE') {
      const index = grades.findIndex( g => g.id === id);
        if (index !== -1) {
            grades.splice(index, 1);
            response.writeHead(204);
            response.end();
    }   else {
            response.writeHead(404, {'Content-type': 'application/json'});
            response.end(JSON.stringify({ message: 'Grade not found' }));
        } 
      } else {
        response.writeHead(404, {'Content-type': 'application/json'});
        response.end(JSON.stringify({ message : ' Route not Found' }));
    } 
    });
  });

  server.listen(port, () => { `Server is running on port ${port}`
    console.log
  });
  