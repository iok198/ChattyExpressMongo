var React = require("react")

function template(documentProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${documentProps.title}</title>
        <!-- <link rel="stylesheet" href="/assets/index.css" /> -->
      </head>
      
      <body>
        <div id="root">${documentProps.body}</div>
      </body>
      
      <!-- <script src="/assets/bundle.js"></script> -->
    </html>
  `;
};

var MyComponent = function(props) {
    return React.createElement("h1", null, "hello guys")
}

module.exports.comp = MyComponent
module.exports.template = template