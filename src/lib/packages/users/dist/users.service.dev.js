"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.isUserExistByEmail = isUserExistByEmail;
exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;

var _prisma = _interopRequireDefault(require("../db/prisma.orm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getAllUsers() {
  var users;
  return regeneratorRuntime.async(function getAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_prisma["default"].user.findMany());

        case 2:
          users = _context.sent;
          return _context.abrupt("return", users);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function createUser(userData) {
  var newUser;
  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_prisma["default"].user.create({
            data: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: String(userData.email).toLowerCase(),
              phone: userData.phone,
              role: "STUDENT",
              password: userData.password
            }
          }));

        case 3:
          newUser = _context2.sent;
          return _context2.abrupt("return", newUser);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          return _context2.abrupt("return", null);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function isUserExistByEmail(email) {
  return regeneratorRuntime.async(function isUserExistByEmail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_prisma["default"].user.findUniqueOrThrow({
            where: {
              email: email
            }
          }));

        case 3:
          return _context3.abrupt("return", !!_context3.sent);

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", false);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function getUserById(userId) {
  return regeneratorRuntime.async(function getUserById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_prisma["default"].user.findFirst({
            where: {
              id: Number(userId)
            }
          }));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getUserByEmail(email) {
  return regeneratorRuntime.async(function getUserByEmail$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_prisma["default"].user.findFirst({
            where: {
              email: String(email).toLowerCase()
            }
          }));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}
//# sourceMappingURL=users.service.dev.js.map
