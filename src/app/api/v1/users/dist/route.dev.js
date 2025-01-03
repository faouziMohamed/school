"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;
exports.POST = POST;

var _users = require("@/lib/packages/users/users.service");

var _server = require("next/server");

function GET() {
  var users;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _users.getAllUsers)());

        case 2:
          users = _context.sent;

          if (users) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "No user exists on the app, retry later",
            users: []
          }, {
            status: 400
          }));

        case 5:
          return _context.abrupt("return", _server.NextResponse.json({
            users: users
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function POST(request) {
  var body, firstName, lastName, email, phone, password, _body$role, role, missingFields, userExist, data, newUser;

  return regeneratorRuntime.async(function POST$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(request.json());

        case 2:
          body = _context2.sent;

          if (body) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            message: "A body is expected on the request but none has been found"
          }, {
            status: 400
          }));

        case 5:
          firstName = body.firstName, lastName = body.lastName, email = body.email, phone = body.phone, password = body.password, _body$role = body.role, role = _body$role === void 0 ? "STUDENT" : _body$role;
          missingFields = [];

          if (!firstName) {
            missingFields.push("firstName");
          }

          if (!lastName) {
            missingFields.push("lastName");
          }

          if (!email) {
            missingFields.push("email");
          }

          if (!phone) {
            missingFields.push("phone");
          }

          if (!password) {
            missingFields.push("password");
          }

          if (!(missingFields.length > 0)) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            message: "Some fields are mandatory but they are missing",
            missingFields: missingFields
          }, {
            status: 400
          }));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap((0, _users.isUserExistByEmail)(email));

        case 16:
          userExist = _context2.sent;

          if (!userExist) {
            _context2.next = 19;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            message: "An account with the provided email already exists",
            signInPath: "/api/v1/sign-in"
          }, {
            status: 400
          }));

        case 19:
          console.log({
            body: body
          });
          data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            role: role,
            password: password
          };
          _context2.next = 23;
          return regeneratorRuntime.awrap((0, _users.createUser)(data));

        case 23:
          newUser = _context2.sent;
          console.log({
            newUser: newUser
          });

          if (newUser) {
            _context2.next = 27;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            message: "An unexpected error has occured, plese try creating the user later"
          }, {
            status: 500
          }));

        case 27:
          return _context2.abrupt("return", _server.NextResponse.json({
            user: newUser,
            url: "/api/v1/users/".concat(newUser.id)
          }, {
            status: 201
          }));

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  });
}
//# sourceMappingURL=route.dev.js.map
