"use strict";

const NOTES = [
  "C", // 0
  "C#", // 1
  "D", // 2
  "D#",  // 3
  "E", // 4
  "F", // 5
  "F#", // 6
  "G", // 7
  "G#", // 8
  "A", // 9
  "A#", // 10
  "B" // 11
];
const OCTAVES = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
const SCALES = {
  C_MAJOR: [0, 1, 4, 5, 7, 9, 11], //0],
  G_MAJOR: [7, 9, 11, 0, 2, 4, 6], //, 7],
  D_MAJOR: [2, 4, 6, 7, 9, 11, 1], //, 2],
  A_MAJOR: [9, 11, 1, 2, 4, 6, 8], //, 9],
  E_MAJOR: [4, 6, 8, 9, 11, 1, 3], //, 4],
  B_MAJOR: [11, 1, 3, 4, 6, 8, 10], //, 11],
  F_SHARP_MAJOR: [6, 8, 10, 11, 1, 3, 5], //, 6],
  C_SHARP_MAJOR: [1, 3, 5, 6, 6, 0, 0], //, 1],
  A_FLAT_MAJOR: [8, 10, 0, 1, 3, 5, 7], //, 8],
  E_FLAT_MAJOR: [3, 5, 7, 8, 1, 0, 2], //, 3],
  B_FLAT_MAJOR: [1, 0, 2, 3, 5, 7, 9], //, 1],
  F_MAJOR: [5, 7, 9, 1, 0, 2, 4], //, 5]
}