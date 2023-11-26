# TestBench.js
[![JavaScript](https://img.shields.io/badge/javascript-black?style=for-the-badge&logo=javascript)](https://github.com/marzeckm)  

**TestBench.js** is a comprehensive testing framework that closely mirrors the capabilities of Jasmine. It is designed to be seamlessly integrated into an HTML file using a standard script tag in the head. Following this, the code to be tested is included. Finally, the test file `*.spec.js` is added at the bottom of the body, or with defer (in browsers that support it).

## Getting Started

To begin using TestBench.js in your project, follow these simple steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/marzeckm/TestBench.js.git
```

2. Include the `TestBench.min.js` file from the folder `bin` in your HTML file:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Test Project</title>
  <script src="path/to/TestBench.js"></script>
</head>
<body>

<!-- Your code to be tested goes here -->

<script src="path/to/your/code.js"></script>

<!-- Include the test file at the end of the body -->
<script src="path/to/test.spec.js" defer></script>

</body>
</html>
```

Replace `"path/to/TestBench.min.js"`, `"path/to/your/code.js"`, and `"path/to/test.spec.js"` with the actual paths to the TestBench.js library, your code, and the test file, respectively.

## Writing Tests
TestBench.js allows you to write tests using a syntax similar to Jasmine. Here's a simple example:

```
describe("MyTestSuite", function() {
  it("should perform some functionality", function() {
    // Your test assertions go here
    expect(true).toBe(true);
  });

  it("should handle edge cases", function() {
    // More test assertions
    expect(1 + 1).toEqual(2);
  });
});
```

## Running Tests
Once your tests are written, open your HTML file in a web browser, and the test results will be displayed in the browser's console.

## Requirements
- Text-Editor for editing the code files
- Min. Internet Explorer 11, Firefox 70, Google Chrome 70, Safari 11, Chromium 70

## Contributing
We welcome contributions to make TestBench.js even more powerful and user-friendly. Feel free to submit issues or pull requests on the GitHub repository. We like any support that we can get.

## License
This project is licensed under the [MIT License](LICENSE).