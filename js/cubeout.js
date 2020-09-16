/*****************************************************************************************/
// Globals
/*****************************************************************************************/

// canvas dimensions
var WIDTH = 500;
var HEIGHT = 500;

var BLOCKS_PLACED = 0
// pit dimensions
var PIT_WIDTH = 5;
var PIT_HEIGHT = 5;
var PIT_DEPTH = 10;

// fake perspective
var ZSIZE_X = 28;
var ZSIZE_Y = 28;

// color constants
var PIECE_COLOR = [50, 0, 90];
var BG_COLOR = '#000';

// cube rendering style
var CUBE_PLAIN = 0,
  CUBE_GRADIENT = 1;

var CUBE_STYLE = CUBE_PLAIN;
var CUBE_OUTLINE = '#000';

var FORCE_DEPTH_COLOR = 1;

var LINEWIDTH_CUBE = 0.5;
var LINEWIDTH_PIT = 0.35;

// game speed
var SPEED = 0;
var GAME_SPEED = SPEED;
var SPEED_MAP = {
  0: 0,
  1: 2000,
  2: 1000,
  3: 500,
  4: 250,
};
var AUTOFALL_DELAY = SPEED_MAP[SPEED];

// animation

var SLOW_ANIM_DURATION = 150;
var MED_ANIM_DURATION = 70;
var FAST_ANIM_DURATION = 10;

var ANIM_DURATION = MED_ANIM_DURATION;


var FRAME_DELAY = 10;

var DELTA = 1;
var DELTA_ANGLE = Math.PI / 2;

// pieces
var SET = 'basic';

// piece shapes
var TEMPLATES = {

  // 2D polyominoes
  flat: [
    [['x']],

    [['xx']],

    [['xxx']],

    [['xx', 'x ']],

    [['xx', 'xx']],

    [['xxx', ' x ']],

    [['xx ', ' xx']],

    [['xxx', 'x  ']],
  ],

  // Polycubes of order three or four
  basic: [
    [['xx', 'x ']],

    [['xxx', ' x ']],

    [['xx ', ' xx']],

    [['xxx', 'x  ']],

    [
      ['xx', 'x '],
      [' x', '  '],
    ],

    [
      ['xx', 'x '],
      ['  ', 'x '],
    ],

    [
      ['xx', 'x '],
      ['x ', '  '],
    ],
  ],

  // All n-polycubes up to n=5
  extended: [
    [['x']],

    [['xx']],

    [['xxx']],

    [['xxxx']],

    [['xxxxx']],

    [['xx', 'x ']],

    [['xx', 'xx']],

    [['xxx', ' x ']],

    [['xx ', ' xx']],

    [['xxx', 'x  ']],

    [['xxx', 'x  ', 'x  ']],

    [['xxx', ' x ', ' x ']],

    [[' x ', 'xx ', ' xx']],

    [['xx ', ' x ', ' xx']],

    [['x  ', 'xx ', ' xx']],

    [['x   ', 'xxxx']],

    [[' x  ', 'xxxx']],

    [['x x', 'xxx']],

    [['xx ', 'xxx']],

    [['  xx', 'xxx ']],

    [[' x ', 'xxx', ' x ']],

    [
      ['xxx', 'x  '],
      ['   ', 'x  '],
    ],

    [
      ['xxx', '  x'],
      ['   ', '  x'],
    ],

    [
      ['xxx', ' x '],
      ['   ', ' x '],
    ],

    [
      ['xxx', 'x  '],
      [' x ', '   '],
    ],

    [
      ['xxx', '  x'],
      [' x ', '   '],
    ],

    [
      ['xx ', ' xx'],
      ['x  ', '   '],
    ],

    [
      [' xx', 'xx '],
      ['  x', '   '],
    ],

    [
      [' x ', 'xx '],
      [' xx', '   '],
    ],

    [
      [' x ', ' xx'],
      ['xx ', '   '],
    ],

    [
      ['xxx', '  x'],
      ['x  ', '   '],
    ],

    [
      ['xxx', 'x  '],
      ['  x', '   '],
    ],

    [
      ['xx', 'x '],
      [' x', '  '],
    ],

    [
      ['xx', 'x '],
      ['  ', 'x '],
    ],

    [
      ['xx', 'x '],
      ['x ', '  '],
    ],

    [
      ['xxx', ' x '],
      [' x ', '   '],
    ],

    [
      ['xx', 'xx'],
      ['x ', '  '],
    ],

    [
      ['xxx', 'x  '],
      ['x  ', '   '],
    ],

    [
      [' xx', ' x '],
      ['xx ', '   '],
    ],

    [
      ['xx ', ' x '],
      [' xx', '   '],
    ],

    [
      ['xx', ' x'],
      ['  ', 'xx'],
    ],
  ],
};

// controls
var KEYCODES = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'control',
  18: 'alt',
  20: 'caps lock',
  27: 'escape',
  32: 'space',
  33: 'page up',
  34: 'page down',
  35: 'end',
  36: 'home',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
  45: 'insert',
  46: 'delete',
  59: ';',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
};

var KEYMAP_DEFAULT = {
  'X+': 39, // right
  'X-': 37, // left
  'Y+': 40, // down
  'Y-': 38, // up
  'Z+': 90, // y
  'Z-': 88, // x

  'A+': 81, // q
  'A-': 65, // a
  'B-': 87, // w
  'B+': 83, // s
  'C+': 68, // d
  'C-': 69, // e

  D: 32, // space
};

var LABELMAP = {
  right: 'X+',
  left: 'X-',
  up: 'Y-',
  down: 'Y+',
  'rotate X+': 'A+',
  'rotate X-': 'A-',
  'rotate Y+': 'B+',
  'rotate Y-': 'B-',
  'rotate Z+': 'C+',
  'rotate Z-': 'C-',
  drop: 'D',
};

var KEYMAP = {};
var KEYMAP_TMP = {};
var LAST_KEY_EL = 0;

// generated data
var PIECES = {};
var LAYERS = [];
var COUNTS = [];
var COLORS = [];
var ALLOWED = [];

var CACHE_PIT = 0,
  CACHE_LAYERS = 0,
  CACHE_SHADOW = 0;

var START, END, ELAPSED;
var ID1 = -1,
  ID2 = -1;

// game state
var STATE = { setkeys: 0 };

// pause
var PAUSE_ANIM = 1;
var PAUSE_WORMS = 1;
var N_ELEMENTS = 250;
var PAUSE_ELEMENTS = [];
var DP = 0;

// highscore
var HIGHSCORE = {};

// username
var USERNAME = '';

// end game context
var CANVAS;
var CTX;

/*****************************************************************************************/
// Pieces
/*****************************************************************************************/
function precompute_pieces() {
  for (var set in TEMPLATES) {
    PIECES[set] = [];
    for (var i = 0; i < TEMPLATES[set].length; ++i) {
      var piece3d = generate_piece(TEMPLATES[set][i]);
      var bb = bbox(piece3d.lines);

      // center of the piece (middle of bounding box)
      var cx = bb.x[0] + (bb.x[1] - bb.x[0]) / 2.0;
      var cy = bb.y[0] + (bb.y[1] - bb.y[0]) / 2.0;
      var cz = bb.z[0] + (bb.z[1] - bb.z[0]) / 2.0;

      // align rotation on full cubes
      cx = Math.floor(cx);
      cy = Math.floor(cy);
      cz = Math.floor(cz);

      PIECES[set][i] = {
        lines: piece3d.lines,
        voxels: piece3d.voxels,
        cx: cx,
        cy: cy,
        cz: cz,
        bb: bb,
      };
    }
  }
}

function generate_layer(width, height) {
  var layer = [];
  for (var y = 0; y < height; ++y) {
    var row = [];
    for (var x = 0; x < width; ++x) {
      row[x] = 0;
    }
    layer.push(row);
  }
  return layer;
}

function generate_layers(width, height, depth) {
  var layers = [];

  for (var z = 0; z < depth; ++z)
  layers.push(generate_layer(width, height));

  return layers;
}

function generate_counts(layers) {
  var depth = layers.length;
  var height = layers[0].length;
  var width = layers[0][0].length;

  var counts = [];

  for (var z = 0; z < depth; ++z) {
    counts[z] = 0;
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        if (layers[z][y][x] != 0) counts[z] += 1;
      }
    }
  }

  return counts;
}

function init_colors(depth) {
  COLORS = [];
  var h, s, l, a;
  var pie = 360 / (depth - 0.5);
  for (var i = 0; i < depth; ++i) {
    h = i * pie;
    s = 90;
    l = 50;
    a = 1.0;
    COLORS.push([h, s, l, a]);
  }
}

function init_layers(layers, type) {
  var depth = layers.length;
  var height = layers[0].length;
  var width = layers[0][0].length;
  var c = rand_range(1, depth - 1);
  for (var z = 0; z < depth; ++z) {
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        layers[z][y][x] = 0;

        switch (type) {
          case 1:
            if (z > depth - 3) layers[z][y][x] = (x > 0 || y > 0) ? 1 : 0;
            break;
          case 2:
            if (z > depth - 2) layers[z][y][x] = (x + y) > 3;
            break;
          case 3:
            if (z >= 0) layers[z][y][x] = (depth - z) * ((width - x) + (height - y) > z ? 0 : 1);
            break;
          case 4:
            if (z > 1 && Math.random() > 0.95) layers[z][y][x] = c;
        }
      }
    }
  }
}

/*****************************************************************************************/
// Random
/*****************************************************************************************/
function rand_range(lo, hi) {
  return Math.round(lo + (hi - lo) * Math.random());
}

/*****************************************************************************************/
// Text
/*****************************************************************************************/
function pretty_number(x) {
  var delimiter = "'";
  var strx = x.toString();
  var pretty = '';
  for (var i = strx.length - 1; i >= 0; i--) {
    if ((strx.length - 1 - i) % 3 == 0 && (strx.length - 1 - i) > 0)
    pretty = delimiter + pretty;
    pretty = strx[i] + pretty;
  }
  return pretty;
}

/*****************************************************************************************/
// Math
/*****************************************************************************************/
function cap(val, max) {
  if (val > max) return max;
  return val;
}

/*****************************************************************************************/
// Geometry
/*****************************************************************************************/
function project(cwidth, cheight, width, height, x, y, z) {
  var offsetx1 = z * ZSIZE_X - z * z;
  var offsety1 = z * ZSIZE_Y - z * z;

  var xsize1 = (cwidth - 2 * offsetx1) / width;
  var ysize1 = (cheight - 2 * offsety1) / height;

  var px = Math.round(offsetx1 + x * xsize1);
  var py = Math.round(offsety1 + y * ysize1);

  return { x: px, y: py };
}

function translate(p, t) {
  return [p[0] + t[0], p[1] + t[1], p[2] + t[2]];
}

function matmult(a, b) {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
    a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
  ];
}

function applymat(p, m) {
  return [
    m[0] * p[0] + m[1] * p[1] + m[2] * p[2],
    m[3] * p[0] + m[4] * p[1] + m[5] * p[2],
    m[6] * p[0] + m[7] * p[1] + m[8] * p[2],
  ];
}

function rotate(p, rotmatrix) {
  return applymat(p, rotmatrix);
}

function get_x_rotmatrix(angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return [
     1, 0, 0,
     0, cos, -sin,
     0, sin, cos
  ];
}

function get_y_rotmatrix(angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return [
     cos, 0, sin,
     0, 1, 0,
     -sin, 0, cos
  ];
}

function get_z_rotmatrix(angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return [
     cos, -sin, 0,
     sin, cos, 0,
     0, 0, 1
  ];
}

function get_combined_rotmatrix(angles) {
  var mx = get_x_rotmatrix(angles[0]);
  var my = matmult(get_y_rotmatrix(angles[1]), mx);
  var mz = matmult(get_z_rotmatrix(angles[2]), my);
  return mz;
}

function bbox(lines) {
  if (lines.length > 0) {
    var minx = lines[0][0][0];
    var maxx = minx;
    var miny = lines[0][0][1];
    var maxy = miny;
    var minz = lines[0][0][2];
    var maxz = minz;
    for (var i = 0; i < lines.length; ++i) {
      if (lines[i][0][0] < minx) minx = lines[i][0][0];
      else if (lines[i][0][0] > maxx) maxx = lines[i][0][0];

      if (lines[i][0][1] < miny) miny = lines[i][0][1];
      else if (lines[i][0][1] > maxy) maxy = lines[i][0][1];

      if (lines[i][0][2] < minz) minz = lines[i][0][2];
      else if (lines[i][0][2] > maxz) maxz = lines[i][0][2];

      if (lines[i][1][0] < minx) minx = lines[i][1][0];
      else if (lines[i][1][0] > maxx) maxx = lines[i][1][0];

      if (lines[i][1][1] < miny) miny = lines[i][1][1];
      else if (lines[i][1][1] > maxy) maxy = lines[i][1][1];

      if (lines[i][1][2] < minz) minz = lines[i][1][2];
      else if (lines[i][1][2] > maxz) maxz = lines[i][1][2];
    }
    return { x: [minx, maxx], y: [miny, maxy], z: [minz, maxz] };
  } else
  return { x: [0, 0], y: [0, 0], z: [0, 0] };
}

function bbox_voxels(points) {
  if (points.length > 0) {
    var minx = points[0][0];
    var maxx = minx;
    var miny = points[0][1];
    var maxy = miny;
    var minz = points[0][2];
    var maxz = minz;
    for (var i = 1; i < points.length; ++i) {
      if (points[i][0] < minx) minx = points[i][0];
      else if (points[i][0] > maxx) maxx = points[i][0];

      if (points[i][1] < miny) miny = points[i][1];
      else if (points[i][1] > maxy) maxy = points[i][1];

      if (points[i][2] < minz) minz = points[i][2];
      else if (points[i][2] > maxz) maxz = points[i][2];
    }
    return { x: [minx, maxx], y: [miny, maxy], z: [minz, maxz] };
  } else
  return { x: [0, 0], y: [0, 0], z: [0, 0] };
}

/*****************************************************************************************/
// Rendering
/*****************************************************************************************/
function line3d(ctx, cwidth, cheight, width, height, s, e, color) {
  var p1 = project(cwidth, cheight, width, height, s[0], s[1], s[2]);
  var p2 = project(cwidth, cheight, width, height, e[0], e[1], e[2]);

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function point3d(ctx, cwidth, cheight, width, height, s, color, radius) {
  var p1 = project(cwidth, cheight, width, height, s[0], s[1], s[2]);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, radius, 0, 6.28, 0);
  ctx.fill();
}

function draw_pit(canvas, ctx, width, height, depth, refresh_flag) {
  if (CACHE_PIT == 0 || refresh_flag) {

    // colors
    var color1 = '#00ff0f'; // gradient start
    var color2 = '#00ff00'; // gradient end
    var bgcolor = BG_COLOR; // pit background

    var cwidth = canvas.width;
    var cheight = canvas.height;

    // background
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, cwidth, cheight);

    // levels
    ctx.lineWidth = LINEWIDTH_PIT;

    var offsetx = 0,
      offsety = 0;
    var r, g, b;
    for (var z = 1; z < depth + 1; ++z) {
      offsetx = z * (ZSIZE_X - z);
      offsety = z * (ZSIZE_Y - z);

      // r = g = b = Math.floor(64 * (0.5 + (2 * (depth - z)) / depth));

            r = 0;
            g = 255;
            b = 0;

      ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      //b = Math.floor(64*(0.1+1*(depth-z)/depth));
      //ctx.strokeStyle = "hsl(0,90%,"+b+"%)";

      ctx.strokeRect(offsetx, offsety, cwidth - 2 * offsetx, cheight - 2 * offsety);
      if (z == depth) {
        ctx.fillStyle = '#000';
        ctx.fillRect(offsetx, offsety, cwidth - 2 * offsetx, cheight - 2 * offsety);
      }
    }

    var xsize_bottom = (cwidth - 2 * offsetx) / width;
    var ysize_bottom = (cheight - 2 * offsety) / height;
    var xsize_top = cwidth / width;
    var ysize_top = cheight / height;

    // bottom grid
    ctx.beginPath();
    for (var x = 1; x < width; ++x) {
      ctx.moveTo(offsetx + x * xsize_bottom, offsety);
      ctx.lineTo(offsetx + x * xsize_bottom, cheight - offsety);
    }
    for (var y = 1; y < height; ++y) {
      ctx.moveTo(offsetx, offsety + y * ysize_bottom);
      ctx.lineTo(cwidth - offsetx, offsety + y * ysize_bottom);
    }
    ctx.stroke();

    // top crossing
    var lingrad = ctx.createLinearGradient(0, 0, 0, cheight / 2);
    lingrad.addColorStop(0.0, color1);
    lingrad.addColorStop(1.0, color2);
    ctx.strokeStyle = lingrad;

    ctx.beginPath();
    for (var x = 0; x < width + 1; ++x) {
      ctx.moveTo(x * xsize_top, 0);
      ctx.lineTo(offsetx + x * xsize_bottom, offsety);
    }
    ctx.stroke();

    // bottom crossing
    lingrad = ctx.createLinearGradient(0, cheight, 0, cheight / 2);
    lingrad.addColorStop(0.0, color1);
    lingrad.addColorStop(1.0, color2);
    ctx.strokeStyle = lingrad;

    ctx.beginPath();
    for (var x = 0; x < width + 1; ++x) {
      ctx.moveTo(x * xsize_top, cheight);
      ctx.lineTo(offsetx + x * xsize_bottom, cheight - offsety);
    }
    ctx.stroke();

    // left crossing
    lingrad = ctx.createLinearGradient(0, 0, cwidth / 2, 0);
    lingrad.addColorStop(0.0, color1);
    lingrad.addColorStop(1.0, color2);
    ctx.strokeStyle = lingrad;

    ctx.beginPath();
    for (var y = 1; y < height; ++y) {
      ctx.moveTo(0, y * ysize_top);
      ctx.lineTo(offsetx, offsety + y * ysize_bottom);
    }
    ctx.stroke();

    // right crossing
    lingrad = ctx.createLinearGradient(cwidth, 0, cwidth / 2, 0);
    lingrad.addColorStop(0.0, color1);
    lingrad.addColorStop(1.0, color2);
    ctx.strokeStyle = lingrad;

    ctx.beginPath();
    for (var y = 1; y < height; ++y) {
      ctx.moveTo(cwidth, y * ysize_top);
      ctx.lineTo(cwidth - offsetx, offsety + y * ysize_bottom);
    }
    ctx.stroke();

    if (CACHE_PIT == 0) {
      var cache = $('<canvas></canvas>');
      cache.css('display', 'none');
      $('body').append(cache);
      cache.attr('width', cwidth).attr('height', cheight);
      CACHE_PIT = cache.get(0);
    }
    CACHE_PIT.getContext('2d').drawImage(canvas, 0, 0);
  } else {
    ctx.drawImage(CACHE_PIT, 0, 0);
  }
}

function render_cube(canvas, ctx, width, height, depth, x, y, z, color, faces, outline) {
  var cwidth = canvas.width;
  var cheight = canvas.height;

  // This breaks Opera, no idea why expanded expressions work
  /*
    var offsetx1 = z*(ZSIZE_X-z);
    var offsety1 = z*(ZSIZE_Y-z);

    var offsetx2 = (z+1)*(ZSIZE_X-(z+1));
    var offsety2 = (z+1)*(ZSIZE_Y-(z+1));
    */
  var offsetx1 = z * ZSIZE_X - z * z;
  var offsety1 = z * ZSIZE_Y - z * z;

  var offsetx2 = z * ZSIZE_X - z * z - z + ZSIZE_X - z - 1;
  var offsety2 = z * ZSIZE_Y - z * z - z + ZSIZE_Y - z - 1;

  var xsize1 = (cwidth - 2 * offsetx1) / width;
  var ysize1 = (cheight - 2 * offsety1) / height;

  var xsize2 = (cwidth - 2 * offsetx2) / width;
  var ysize2 = (cheight - 2 * offsety2) / height;

  var left1 = Math.round(offsetx1 + x * xsize1);
  var top1 = Math.round(offsety1 + y * ysize1);
  var right1 = Math.round(left1 + xsize1);
  var bottom1 = Math.round(top1 + ysize1);

  var left2 = Math.round(offsetx2 + x * xsize2);
  var top2 = Math.round(offsety2 + y * ysize2);
  var right2 = Math.round(left2 + xsize2);
  var bottom2 = Math.round(top2 + ysize2);

  var cx = 0.5 * width;
  var cy = 0.5 * height;

  /*
    // bottom side
    ctx.fillStyle = "#aaa";
    ctx.strokeStyle = "#000000";
    ctx.fillRect(  left2, top2, xsize2,ysize2);
    ctx.strokeRect(left2, top2, xsize2,ysize2);
    */

  var lightness = (0.3 + (0.7 * (depth - z)) / depth) * color[2];
  var topcolor =
    'hsla(' + Math.floor(color[0]) + ',' + Math.floor(color[1]) + '%,' +
    Math.floor(lightness) + '%,' + color[3] + ')';
  var sidecolor =
    'hsla(' + Math.floor(color[0]) + ',' + Math.floor(color[1]) +    '%,' +
    Math.floor(0.75 * lightness) +  '%,' + color[3] + ')';
  var sidecolor2 = 'hsla(' + Math.floor(color[0]) + ',' + Math.floor(color[1]) + '%,' +
    Math.floor(0.5 * lightness) + '%,' + color[3] +
    ')';

  var render_style = CUBE_STYLE;

  ctx.lineWidth = LINEWIDTH_CUBE;

  // right side
  if (faces[0] && x < cx) {

    if (render_style == CUBE_GRADIENT) {
      var lingrad = ctx.createLinearGradient(right1, top1, right2, bottom2);
      lingrad.addColorStop(0.0, sidecolor);
      lingrad.addColorStop(1.0, sidecolor2);
      ctx.fillStyle = lingrad;
    } else
         ctx.fillStyle = sidecolor2;

    if (outline)
       ctx.strokeStyle = outline;
    else
       ctx.strokeStyle = sidecolor2;
    ctx.beginPath();
    ctx.moveTo(right1, top1);
    ctx.lineTo(right2, top2);
    ctx.lineTo(right2, bottom2);
    ctx.lineTo(right1, bottom1);
    ctx.fill();
    ctx.stroke();
  }

  // down side
  if (faces[1] && y + 1 < cy) {
    ctx.fillStyle = sidecolor;
    if (outline)
        ctx.strokeStyle = outline;
    else
        ctx.strokeStyle = sidecolor;
    ctx.beginPath();
    ctx.moveTo(left1, bottom1);
    ctx.lineTo(left2, bottom2);
    ctx.lineTo(right2, bottom2);
    ctx.lineTo(right1, bottom1);
    ctx.fill();
    ctx.stroke();
  }

  // left side
  if (faces[2] && x > cx) {
    ctx.fillStyle = sidecolor2;
    if (outline)
       ctx.strokeStyle = outline;
    else
       ctx.strokeStyle = sidecolor2;
    ctx.beginPath();
    ctx.moveTo(left1, top1);
    ctx.lineTo(left2, top2);
    ctx.lineTo(left2, bottom2);
    ctx.lineTo(left1, bottom1);
    ctx.fill();
    ctx.stroke();
  }

  // up side
  if (faces[3] && y > cy) {
    ctx.fillStyle = sidecolor;
    if (outline)
       ctx.strokeStyle = outline;
    else
       ctx.strokeStyle = sidecolor;
    ctx.beginPath();
    ctx.moveTo(right1, top1);
    ctx.lineTo(right2, top2);
    ctx.lineTo(left2, top2);
    ctx.lineTo(left1, top1);
    ctx.fill();
    ctx.stroke();
  }

  // top side
  if (faces[4]) {
    if (render_style == CUBE_GRADIENT) {
      var lingrad = ctx.createLinearGradient(left1, top1, left1 + xsize1, top1 + ysize1);
      lingrad.addColorStop(0.0, topcolor);
      lingrad.addColorStop(0.5, sidecolor);
      lingrad.addColorStop(1.0, sidecolor2);
      ctx.fillStyle = lingrad;
    } else
       ctx.fillStyle = topcolor;

    if (outline)
       ctx.strokeStyle = outline;
    else
       ctx.strokeStyle = topcolor;
    ctx.fillRect(left1, top1, xsize1, ysize1);
    ctx.strokeRect(left1, top1, xsize1, ysize1);
  }
}

function render_shadow(canvas, ctx, margin, refresh_flag) {
  if (CACHE_SHADOW == 0 || refresh_flag) {
    var cwidth = canvas.width;
    var cheight = canvas.height;

    if (CACHE_SHADOW == 0) {
      var cache = $('<canvas></canvas>');
      cache.css('display', 'none');
      $('body').append(cache);
      cache.attr('width', cwidth).attr('height', cheight);
      CACHE_SHADOW = cache.get(0);
    }

    var cache_ctx = CACHE_SHADOW.getContext('2d');

    var sx = 0;
    var sy = 0;

    var start = 'rgba(0,0,0,0.5)';
    var end = 'rgba(0,0,0,0)';

    // top
    var lingrad = ctx.createLinearGradient(sx, sy, sx, margin);
    lingrad.addColorStop(0.0, start);
    lingrad.addColorStop(1.0, end);
    cache_ctx.fillStyle = lingrad;
    cache_ctx.fillRect(sx, sy, cwidth - sx, margin);

    // bottom
    lingrad = ctx.createLinearGradient(sx, cheight, sy, cheight - margin);
    lingrad.addColorStop(0.0, start);
    lingrad.addColorStop(1.0, end);
    cache_ctx.fillStyle = lingrad;
    cache_ctx.fillRect(sx, cheight - margin, cwidth - sx, margin);

    // left
    lingrad = ctx.createLinearGradient(sx, sy, margin, sy);
    lingrad.addColorStop(0.0, start);
    lingrad.addColorStop(1.0, end);
    cache_ctx.fillStyle = lingrad;
    cache_ctx.fillRect(sx, sy, margin, cheight - sy);

    // right
    lingrad = ctx.createLinearGradient(cwidth, sy, cwidth - margin, sy);
    lingrad.addColorStop(0.0, start);
    lingrad.addColorStop(1.0, end);
    cache_ctx.fillStyle = lingrad;
    cache_ctx.fillRect(cwidth - margin, sy, margin, cheight - sy);
  }

  ctx.drawImage(CACHE_SHADOW, 0, 0);
}

function render_layer(canvas, ctx, layer, z, outline, depth) {
  var row = '';
  var color;

  var force_color = FORCE_DEPTH_COLOR;

  // right,down,left,up sides pass
  var faces = [1, 1, 1, 1, 0];
  for (var y = 0; y < layer.length; ++y) {
    row = layer[y];
    for (var x = 0; x < row.length; ++x) {
      if (row[x] != '0') {
        if (x > 0)
        faces[2] = !parseInt(row[x - 1]);
        if (x < row.length - 1)
        faces[0] = !parseInt(row[x + 1]);
        if (y > 0)
        faces[3] = !parseInt(layer[y - 1][x]);
        if (y < layer.length - 1)
        faces[1] = !parseInt(layer[y + 1][x]);

        if (force_color)
           color = depth - z - 1;
        else
           color = row[x] - 1;

        render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, x, y, z, COLORS[color], faces, outline);
        faces = [1, 1, 1, 1, 0];
      }
    }
  }

  // top sides pass
  faces = [0, 0, 0, 0, 1];
  for (var y = 0; y < layer.length; ++y) {
    row = layer[y];
    for (var x = 0; x < row.length; ++x) {
      if (row[x] != '0') {
        if (force_color)
           color = depth - z - 1;
        else
           color = row[x] - 1;
        render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, x, y, z, COLORS[color], faces, outline);
      }
    }
  }
}

function render_layers(canvas, ctx, layers, refresh_flag) {
  var outline = CUBE_OUTLINE;

  if (CACHE_LAYERS == 0 || refresh_flag) {
    //draw_pit(canvas, ctx, PIT_WIDTH,PIT_HEIGHT,PIT_DEPTH);

    // render bottom->top order
    for (var i = layers.length - 1; i >= 0; --i)
    render_layer(canvas, ctx, layers[i], i, outline, layers.length);

    if (CACHE_LAYERS == 0) {
      var cache = $('<canvas></canvas>');
      cache.css('display', 'none');
      $('body').append(cache);
      cache.attr('width', canvas.width).attr('height', canvas.height);
      CACHE_LAYERS = cache.get(0);
    }
    CACHE_LAYERS.getContext('2d').drawImage(canvas, 0, 0);
    STATE.refresh_layers_flag = 0;
  } else {
    ctx.drawImage(CACHE_LAYERS, 0, 0);
  }
}

function generate_piece(shape) {
  var lines = [];
  var map = {};

  var voxels = [];

  function add_line(a, b) {
    var linehash1 = '#' + a[0] + '#' + a[1] + '#' + a[2] + '#' + b[0] + '#' + b[1] + '#' + b[2];
    var linehash2 = '#' + b[0] + '#' + b[1] + '#' + b[2] + '#' + a[0] + '#' + a[1] + '#' + a[2];
    if (map[linehash1] == undefined && map[linehash2] == undefined)
      map[linehash1] = [
        [a[0], a[1], a[2]],
        [b[0], b[1], b[2]],
      ];
    else {
      if (map[linehash1] != undefined) delete map[linehash1];
      if (map[linehash2] != undefined) delete map[linehash2];
    }
  }

  for (var z = 0; z < shape.length; ++z) {
    layer = shape[z];
    for (var y = 0; y < layer.length; ++y) {
      row = layer[y];
      for (var x = 0; x < row.length; ++x) {
        if (row[x] != ' ') {
          // top face
          add_line([x, y, z], [x + 1, y, z]);
          add_line([x + 1, y, z], [x + 1, y + 1, z]);
          add_line([x + 1, y + 1, z], [x, y + 1, z]);
          add_line([x, y + 1, z], [x, y, z]);

          // bottom face
          add_line([x, y, z + 1], [x + 1, y, z + 1]);
          add_line([x + 1, y, z + 1], [x + 1, y + 1, z + 1]);
          add_line([x + 1, y + 1, z + 1], [x, y + 1, z + 1]);
          add_line([x, y + 1, z + 1], [x, y, z + 1]);

          // side faces
          add_line([x, y, z], [x, y, z + 1]);
          add_line([x + 1, y, z], [x + 1, y, z + 1]);
          add_line([x + 1, y + 1, z], [x + 1, y + 1, z + 1]);
          add_line([x, y + 1, z], [x, y + 1, z + 1]);

          voxels.push([x + 0.5, y + 0.5, z + 0.5]);
        }
      }
    }
  }

  for (var i in map)
  lines.push(map[i]);

  return { lines: lines, voxels: voxels };
}

function render_piece(canvas, ctx, width, height, depth, x, y, z, piece, rotmatrix, color) {
  var cwidth = canvas.width;
  var cheight = canvas.height;

  var cx = piece.cx;
  var cy = piece.cy;
  var cz = piece.cz;

  /*
    var r = g = b = Math.floor(64*(2+2*(depth-z)/depth));
    var c = "rgb("+r+","+g+","+b+")";
    */
  var l = 0.25 * (2 + (2 * (depth - z)) / depth);
  var c = 'hsl(' + color[0] + ',' + color[1] + '%,' + l * color[2] + '%)';

  var p1, p2, r1, r2;
  for (var i = 0; i < piece.lines.length; ++i) {
    p1 = translate(piece.lines[i][0], [-cx, -cy, -cz]);
    p2 = translate(piece.lines[i][1], [-cx, -cy, -cz]);
    r1 = translate(rotate(p1, rotmatrix), [x + cx, y + cy, z + cz]);
    r2 = translate(rotate(p2, rotmatrix), [x + cx, y + cy, z + cz]);

    //ctx.lineWidth = 0.5+1.5*(depth-0.5*(r1[2]+r2[2]))/depth;
    ctx.lineWidth = 0.5 + (1.5 * (depth - z)) / depth;
    line3d(ctx, cwidth, cheight, width, height, r1, r2, c);
  }


  /*
    // Voxel test
    for(var i=0; i<piece.voxels.length; ++i) {
        var p1 = translate(piece.voxels[i], [-cx,-cy,-cz]);
        var r1 = translate(rotate(p1, angles), [x+cx,y+cy,z+cz]);
        point3d(ctx, cwidth,cheight, width,height, r1, "red", 3);
    }
    */

}

function render_pit(canvas, ctx) {
  draw_pit(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 1);
  render_layers(canvas, ctx, LAYERS, 1);

  // transparent overlay layer below shadow
    ctx.fillStyle = 'rgba(25,25,25,0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  render_shadow(canvas, ctx, 100, 0, 1);
}

/*****************************************************************************************/
// Voxels
/*****************************************************************************************/
function bbox_piece(shape) {
  var width = shape[0][0].length;
  var height = shape[0].length;
  var depth = shape.length;
  return { width: width, height: height, depth: depth };
}

function project_voxels(piece, x, y, z, rotmatrix) {
  var voxels = [];
  var cx = piece.cx;
  var cy = piece.cy;
  var cz = piece.cz;
  for (var i = 0; i < piece.voxels.length; ++i) {
    var p = translate(piece.voxels[i], [-cx, -cy, -cz]);
    var r = translate(rotate(p, rotmatrix), [x + cx, y + cy, z + cz]);
    r[0] = Math.floor(r[0]);
    r[1] = Math.floor(r[1]);
    r[2] = Math.floor(r[2]);
    voxels.push(r);
  }
  return voxels;
}

function is_overlap_layers(voxels, pwidth, pheight, pdepth, layers) {
  var x, y, z;
  for (var i = 0; i < voxels.length; ++i) {
    if (voxels[i][0] < 0) return 1;
    if (voxels[i][1] < 0) return 1;
    if (voxels[i][2] < 0) return 1;

    if (voxels[i][0] >= pwidth) return 1;
    if (voxels[i][1] >= pheight) return 1;
    if (voxels[i][2] >= pdepth) return 1;

    x = voxels[i][0];
    y = voxels[i][1];
    z = voxels[i][2];
    if (layers[z][y][x]) return 1;
  }
  return 0;
}

function is_overlap(voxels, pwidth, pheight, pdepth) {
  for (var i = 0; i < voxels.length; ++i) {
    if (voxels[i][0] < 0) return 1;
    if (voxels[i][1] < 0) return 1;
    if (voxels[i][2] < 0) return 1;

    if (voxels[i][0] >= pwidth) return 1;
    if (voxels[i][1] >= pheight) return 1;
    if (voxels[i][2] >= pdepth) return 1;
  }
  return 0;
}

function overlap_diff(voxels, pwidth, pheight, pdepth) {
  var dx = 0,
    dy = 0,
    dz = 0;

  var bbox = bbox_voxels(voxels);

  // no delta if voxels are bigger than pit
  if (
    !(bbox.x[0] < 0 && bbox.x[1] >= pwidth) ||
    !(bbox.y[0] < 0 && bbox.y[1] >= pheight) ||
    !(bbox.z[0] < 0 && bbox.z[1] >= pdepth)
  ) {
    if (bbox.x[0] < 0) dx = -bbox.x[0];
        if (bbox.x[1] > pwidth - 1) dx = pwidth - 1 - bbox.x[1];

    if (bbox.y[0] < 0) dy = -bbox.y[0];
        if (bbox.y[1] > pheight - 1) dy = pheight - 1 - bbox.y[1];

    if (bbox.z[0] < 0) dz = -bbox.z[0];
        if (bbox.z[1] > pdepth - 1) dz = pdepth - 1 - bbox.z[1];
  }

  return [dx, dy, dz];
}

function add_voxels(voxels, layers, counts) {
  var x, y, z;
  var total = 0;
  var depth = layers.length;
  for (var i = 0; i < voxels.length; ++i) {
    x = voxels[i][0];
    y = voxels[i][1];
    z = voxels[i][2];

    if (layers[z][y][x] == 0) {
      counts[z] += 1;
      total += 1;
    }
    layers[z][y][x] = depth - z;
  }
  return total;
}

function dump_layers(layers) {
  var depth = layers.length;
  var height = layers[0].length;
  var width = layers[0][0].length;

    var tmp = '';
  for (var z = 0; z < depth; ++z) {
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        tmp += layers[z][y][x];
      }
            tmp += '<br/>';
    }
        tmp += z + '<br/>';
  }

     $('#layers').html(tmp);
}

function remove_layer(layers, n) {
  var height = layers[0].length;
  var width = layers[0][0].length;
  layers.splice(n, 1);
  layers.unshift(generate_layer(width, height));
}

function check_full_layers(layers, counts) {
  var score = 0;
  var depth = layers.length;
  var height = layers[0].length;
  var width = layers[0][0].length;
  var fullsize = width * height;

  var todo = [];

  for (var i = 0; i < counts.length; ++i) {
    if (counts[i] == fullsize) {
      score += 1;
      remove_layer(layers, i);
      todo.push(i);
    }
  }

  for (var i = 0; i < todo.length; ++i) {
    counts.splice(todo[i], 1);
    counts.unshift(0);
  }

  return score * fullsize;
}

/*****************************************************************************************/
// Utils
/*****************************************************************************************/
function log(text) {
  $('#log').css('display', 'block');
  $('#log').append(text + '<br/>');
}

/*****************************************************************************************/
// Tests
/*****************************************************************************************/
function test_cubes(canvas, ctx) {
  var faces = [1, 1, 1, 1, 1];
    var outline = '#000';

  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 0, 0, 0, [0, 100, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 4, 0, 0, [60, 100, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 4, 4, 0, [120, 100, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 0, 4, 0, [180, 100, 50, 1.0], faces, outline);

  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 2, 0, 3, [255, 100, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 1, 4, 3, [255, 100, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 3, 0, 1, [255, 100, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 3, 0, 0, [255, 100, 50, 1.0], faces, outline);

  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 4, 4, 9, [255, 90, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 3, 4, 9, [255, 90, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 2, 4, 9, [255, 90, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 3, 3, 9, [255, 90, 50, 1.0], faces, outline);

  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 3, 1, 9, [355, 90, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 3, 2, 9, [355, 90, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 2, 3, 9, [355, 90, 50, 1.0], faces, outline);
  render_cube(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 2, 2, 9, [355, 90, 50, 1.0], faces, outline);

  render_shadow(canvas, ctx, 100);
}

function test_layer(canvas, ctx) {
    var layer0 = ['11122', '30012', '30002', '30004', '00004'];
    var layer1 = ['11122', '31112', '32022', '31044', '11144'];
    var layer2 = ['11122', '01112', '32002', '30044', '00004'];
    render_layer(canvas, ctx, layer1, 9, '#000');
  /*
    render_layer(canvas, ctx, layer1, 8, "#000");
    render_layer(canvas, ctx, layer1, 7, "#000");
    render_layer(canvas, ctx, layer1, 6, "#000");
    render_layer(canvas, ctx, layer1, 5, "#000");
    render_layer(canvas, ctx, layer1, 4, "#000");
    render_layer(canvas, ctx, layer1, 3, "#000");
    render_layer(canvas, ctx, layer1, 2, "#000");
    render_layer(canvas, ctx, layer1, 1, "#000");
    render_layer(canvas, ctx, layer0, 0, "#000");
    */

  render_piece(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, 0, 0, 0, PIECES['flat'][0], [0, 0, 0], PIECE_COLOR);

  //render_shadow(canvas, ctx, 100);
}

function test_cache(canvas, ctx) {
  var start = new Date().getTime();
  draw_pit(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
  var end = new Date().getTime();

  log('pit uncached: ' + (end - start) + 'ms');

  var start = new Date().getTime();
  draw_pit(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
  var end = new Date().getTime();

  log('pit cached: ' + (end - start) + 'ms');

  //test_cubes(canvas, ctx);

  var start = new Date().getTime();
  //test_layer(canvas, ctx);
  render_layers(canvas, ctx, LAYERS);
  var end = new Date().getTime();
  log('layer uncached: ' + (end - start) + 'ms');

  var start = new Date().getTime();
  render_layers(canvas, ctx, LAYERS);
  var end = new Date().getTime();
  log('layer cached: ' + (end - start) + 'ms');
}

/*****************************************************************************************/
// Pause magic
/*****************************************************************************************/
function init_pause_elements() {
  for (var i = 0; i < N_ELEMENTS; ++i) {
    var x = rand_range(0, 100 * PIT_WIDTH - 1) / 100;
    var y = rand_range(0, 100 * PIT_HEIGHT - 1) / 100;
    var z = rand_range(0, 100 * PIT_DEPTH - 1) / 100;
    var d = 0.01 * rand_range(4, 6);
    PAUSE_ELEMENTS[i] = [x, y, z, d];
  }
}

function pause(canvas, ctx) {
  if (STATE.paused) {
    clearTimeout(ID1);

    FORCE_DEPTH_COLOR = 1;
    draw_pit(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
    render_layers(canvas, ctx, LAYERS, 1);

        ID1 = setInterval(function () {
        game_loop(canvas, ctx);
    }, FRAME_DELAY);
    if (AUTOFALL_DELAY)
            ID2 = setInterval(function () {
        autofall(canvas, ctx);
      }, AUTOFALL_DELAY);
    STATE.paused = 0;
    STATE.pause_ended_flag = 1;

        $('#score').css('display', 'block');
        $('#column').css('display', 'block');
        $('#pause').css('display', 'none');
  } else {
    clearTimeout(ID1);
    clearTimeout(ID2);
    STATE.paused = 1;

    if (PAUSE_ANIM) {
      init_pause_elements();

      DP = 0;

      var i,    n,    d,   r,   c,   h = rand_range(0, 360);
            var bg = 'hsl(' + ((h + 30) % 360) + ',90%,5%)';
            var zsort = function (a, b) { return b[2] - a[2]; };
         var cwidth = canvas.width;
         var cheight = canvas.height;

      PAUSE_WORMS = rand_range(0, 1);

      if (PAUSE_WORMS) {
                c = 'hsla(' + h + ',90%,50%,0.5)';
                bg = 'rgba(0,0,0,0.07)';
                ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        n = rand_range(0, 1);
      }

      ID1 = setInterval(function () {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        if (!PAUSE_WORMS) PAUSE_ELEMENTS.sort(zsort);
        for (i = 0; i < N_ELEMENTS; ++i) {
           if (!PAUSE_WORMS)
                      c = 'hsl(' + h + ',90%,' + ((40 * (PIT_DEPTH - PAUSE_ELEMENTS[i][2])) / PIT_DEPTH).toFixed(0) + '%)';
          else {
            d = 20 * PAUSE_ELEMENTS[i][n];
                        c = 'hsla(' + ((h + d).toFixed(0) % 360) + ',90%,50%,0.5)';
          }

                    r = cap((10 * (PIT_DEPTH - PAUSE_ELEMENTS[i][2])) / PIT_DEPTH, 10);
          point3d(ctx, cwidth, cheight, PIT_WIDTH, PIT_HEIGHT, PAUSE_ELEMENTS[i], c, r);

          PAUSE_ELEMENTS[i][2] -= PAUSE_ELEMENTS[i][3];
          if (!PAUSE_WORMS) {
            PAUSE_ELEMENTS[i][0] += 0.01 * Math.sin(DP + PAUSE_ELEMENTS[i][2]);
            PAUSE_ELEMENTS[i][1] += 0.01 * Math.cos(DP + PAUSE_ELEMENTS[i][0]);
          } else {
            PAUSE_ELEMENTS[i][0] += 0.005 * Math.sin(DP);
            PAUSE_ELEMENTS[i][1] += 0.005 * Math.cos(DP);
          }
          if (
            PAUSE_ELEMENTS[i][2] < -5 ||
            PAUSE_ELEMENTS[i][0] < -10 ||
            PAUSE_ELEMENTS[i][1] < -10 ||
            PAUSE_ELEMENTS[i][0] > PIT_WIDTH + 10 ||
            PAUSE_ELEMENTS[i][1] > PIT_HEIGHT + 10
          ) {
            PAUSE_ELEMENTS[i][2] = PIT_DEPTH;
            PAUSE_ELEMENTS[i][0] = rand_range(0, 100 * PIT_WIDTH - 1) / 100;
            PAUSE_ELEMENTS[i][1] = rand_range(0, 100 * PIT_HEIGHT - 1) / 100;
          }
        }
        DP += 0.01;
        if (!PAUSE_WORMS) render_shadow(canvas, ctx, 100);
      }, FRAME_DELAY);

      $('#footer').css('display', 'none');
    }

    // simple static random cubes
    else {
      var tmp = generate_layers(PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
      init_layers(tmp, 4);
      FORCE_DEPTH_COLOR = 0;

      draw_pit(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
      render_layers(canvas, ctx, tmp, 1);
      render_shadow(canvas, ctx, 100);
    }

    $('#score').css('display', 'none');
    $('#column').css('display', 'none');
    $('#pause').css('display', 'block');
  }
}

/*****************************************************************************************/
// Gameplay
/*****************************************************************************************/
function reset_pit(type) {
  LAYERS = generate_layers(PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
  init_layers(LAYERS, type);
  COUNTS = generate_counts(LAYERS);
}

function init_game_keys(canvas, ctx) {
  var start_handler = function (e) {
    if (!STATE.setkeys && e.which == 32) {
      LAST_KEY_EL = 0;
      play_game(canvas, ctx, start_handler);
    }
    if (e.which == 27) {
      set_ui_start();
    }
    set_key(e.which);
  };
  $(document).keydown(start_handler);
}

function end_game(canvas, ctx) {
  $(document).unbind('keydown');
  set_ui_gameover();
  CANVAS = canvas;
  CTX = ctx;
}

function handle_key(e, canvas, ctx) {
  if (STATE.paused) {
    pause(canvas, ctx);
    return;
  }

  var translate_flag = 0;
  var rotate_flag = 0;
  var drop_flag = 0;
  var anim_flag = 0;

  var dx = 0,
    dy = 0,
    dz = 0;
  var da = [0, 0, 0];
  var rot;

  var rotx = [1, 0, 0, 0, 0, -1, 0, 1, 0];
  var roty = [0, 0, 1, 0, 1, 0, -1, 0, 0];
  var rotz = [0, -1, 0, 1, 0, 0, 0, 0, 1];

  var invert = function (m) {
    var r = new Array(9);
    r[0] = m[0];
    r[1] = -m[1];
    r[2] = -m[2];
    r[3] = -m[3];
    r[4] = m[4];
    r[5] = -m[5];
    r[6] = -m[6];
    r[7] = -m[7];
    r[8] = m[8];
    return r;
  };

  switch (e.which) {
    // translations
    case KEYMAP['X+']:
      translate_flag = 1;
      dx = DELTA;
      break;
    case KEYMAP['X-']:
      translate_flag = 1;
      dx = -DELTA;
      break;
    case KEYMAP['Y+']:
      translate_flag = 1;
      dy = DELTA;
      break;
    case KEYMAP['Y-']:
      translate_flag = 1;
      dy = -DELTA;
      break;
    case KEYMAP['Z+']:
      translate_flag = 1;
      dz = DELTA;
      break;
    case KEYMAP['Z-']:
      translate_flag = 1;
      dz = -DELTA;
      break;

    // rotations
    case KEYMAP['A+']:
      rotate_flag = 1;
      da[0] = DELTA_ANGLE;
      rot = rotx;
      break;
    case KEYMAP['A-']:
      rotate_flag = 1;
      da[0] = -DELTA_ANGLE;
      rot = invert(rotx);
      break;
    case KEYMAP['B+']:
      rotate_flag = 1;
      da[1] = DELTA_ANGLE;
      rot = roty;
      break;
    case KEYMAP['B-']:
      rotate_flag = 1;
      da[1] = -DELTA_ANGLE;
      rot = invert(roty);
      break;
    case KEYMAP['C+']:
      rotate_flag = 1;
      da[2] = DELTA_ANGLE;
      rot = rotz;
      break;
    case KEYMAP['C-']:
      rotate_flag = 1;
      da[2] = -DELTA_ANGLE;
      rot = invert(rotz);
      break;

    // space
    case KEYMAP['D']:
      drop_flag = 1;
      break;

    // pause
    case 80:
      pause(canvas, ctx);
      break;

    // escape
    case 27:
      game_over(canvas, ctx);
      break;
  }

  var nvoxels;

  if (translate_flag) {
    nvoxels = project_voxels(STATE.piece, STATE.new_x + dx, STATE.new_y + dy, STATE.new_z + dz, STATE.new_matrix);
    if (!is_overlap_layers(nvoxels, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, LAYERS)) {
      STATE.new_x += dx;
      STATE.new_y += dy;
      STATE.new_z += dz;
      anim_flag = 1;
    }
    e.preventDefault();
  }

  if (rotate_flag) {
    STATE.new_matrix = matmult(rot, STATE.new_matrix);
    nvoxels = project_voxels(STATE.piece, STATE.new_x, STATE.new_y, STATE.new_z, STATE.new_matrix);
    var deltas = overlap_diff(nvoxels, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
    STATE.new_x += deltas[0];
    STATE.new_y += deltas[1];
    STATE.new_z += deltas[2];
    STATE.new_angles = da;
    anim_flag = 1;
  }

  if (drop_flag) {
    for (var i = 0; i < PIT_DEPTH; ++i) {
      nvoxels = project_voxels(STATE.piece, STATE.new_x, STATE.new_y, STATE.new_z + DELTA, STATE.new_matrix);
      if (!is_overlap_layers(nvoxels, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, LAYERS)) {
        STATE.new_z += DELTA;
        anim_flag = 1;
      } else {
        break;
      }
    }
    STATE.touchdown_flag = 1;
    e.preventDefault();
  }

  if (anim_flag) set_start(rotate_flag);
}

function play_game(canvas, ctx, start_handler) {
  $(document).unbind('keydown', start_handler);
  set_ui_game();
  reset_pit(0);
  refresh_column();

  GAME_SPEED = SPEED;
  BLOCKS_PLACED = 0;
  AUTOFALL_DELAY = SPEED_MAP[GAME_SPEED];
  $('#speed .button').each(function () {
    $(this).removeClass('on');
    if ($(this).text().toLowerCase() == GAME_SPEED) $(this).addClass('on');
  });

  STATE.paused = 0;
  STATE.pause_ended_flag = 0;
  STATE.score = 0;
  refresh_score();

  STATE.refresh_layers_flag = 1;
  reset(canvas, ctx);
  STATE.refresh_layers_flag = 0;
  STATE.render_shadow_flag = 0;

    START = new Date().getTime();
    ID1 = setInterval(function () { game_loop(canvas, ctx);}, FRAME_DELAY);
  if (AUTOFALL_DELAY)
      ID2 = setInterval(function () {  autofall(canvas, ctx);  }, AUTOFALL_DELAY);

  $(document).keydown(function (e) {
    handle_key(e, canvas, ctx);
  });
}

// fps counter globals
var COUNTER = 0;
var EC = 0;
(SC = 0), (XC = 0);

function game_loop(canvas, ctx) {
  END = new Date().getTime();
  ELAPSED = END - START;
  START = END;

  //if(ELAPSED<FRAME_DELAY) {  log(ELAPSED); ELAPSED = FRAME_DELAY; }

  /*
    // FPS averaged over multiple frames
    // to avoid JS getTime inaccuracies
    //  -- http://ejohn.org/blog/accuracy-of-javascript-time/
    COUNTER += 1;
    if(COUNTER % 50 == 0) {
        EC = (new Date).getTime();
        XC = EC - SC;
        SC = EC;
        $("#fps").text(50*(1000/XC).toFixed(1));
    }
    */

  var prev_progress = STATE.progress;
  STATE.progress = cap(STATE.progress + ELAPSED / ANIM_DURATION, 1);

  if (STATE.touchdown_flag && STATE.progress >= 1) {
    speed_up(canvas, ctx);
    touchdown();
    if (STATE.new_z == 0) game_over(canvas, ctx);
    else new_piece(canvas, ctx);
  }

  // animate
  STATE.current_x = STATE.start_x + STATE.progress * (STATE.new_x - STATE.start_x);
  STATE.current_y = STATE.start_y + STATE.progress * (STATE.new_y - STATE.start_y);
  STATE.current_z = STATE.start_z + STATE.progress * (STATE.new_z - STATE.start_z);

  if (STATE.progress >= 1) {
    STATE.current_matrix = STATE.new_matrix;
    STATE.new_angles = [0, 0, 0];
  } else {
    var angles = [
      STATE.progress * STATE.new_angles[0],
      STATE.progress * STATE.new_angles[1],
      STATE.progress * STATE.new_angles[2],
    ];
    STATE.current_matrix = matmult(get_combined_rotmatrix(angles), STATE.start_matrix);
  }

  // render
  if (STATE.progress != prev_progress || STATE.pause_ended_flag) {
    STATE.pause_ended_flag = 0;
    render_frame(canvas, ctx);
  }

}

function render_frame(canvas, ctx) {
  draw_pit(canvas, ctx, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH);
  render_layers(canvas, ctx, LAYERS, STATE.refresh_layers_flag);
  if (STATE.render_piece_flag)
    render_piece(
      canvas,
      ctx,
      PIT_WIDTH,
      PIT_HEIGHT,
      PIT_DEPTH,
      STATE.current_x,
      STATE.current_y,
      STATE.current_z,
      STATE.piece,
      STATE.current_matrix,
      PIECE_COLOR
    );
  //if(STATE.render_shadow_flag)
  //    render_shadow(canvas, ctx, 100);
}

function reset(canvas, ctx) {
  STATE.pi = ALLOWED[rand_range(0, ALLOWED.length - 1)];
  STATE.piece = PIECES[SET][STATE.pi];
  STATE.current_x = 0;
  STATE.current_y = 0;
  STATE.current_z = 0;
  STATE.current_matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  STATE.new_x = 0;
  STATE.new_y = 0;
  STATE.new_z = 0;
  STATE.new_matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  STATE.new_angles = [0, 0, 0];

  STATE.start_x = 0;
  STATE.start_y = 0;
  STATE.start_z = 0;
  STATE.start_matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  STATE.progress = 0;

  STATE.render_piece_flag = 1;
  STATE.touchdown_flag = 0;


  render_frame(canvas, ctx);
}

function set_start(keep_angles) {
  STATE.start_x = STATE.current_x;
  STATE.start_y = STATE.current_y;
  STATE.start_z = STATE.current_z;

  // snap to final rotated position
  if (!keep_angles) {
    STATE.current_matrix = STATE.new_matrix;
    STATE.new_angles = [0, 0, 0];
  }

  STATE.start_matrix = STATE.current_matrix;
  STATE.progress = 0;
}
function touchdown() {
  STATE.render_piece_flag = 0;
  STATE.refresh_layers_flag = 1;

  nvoxels = project_voxels(STATE.piece, STATE.new_x, STATE.new_y, STATE.new_z, STATE.new_matrix);
  STATE.score += add_voxels(nvoxels, LAYERS, COUNTS);

  STATE.score += check_full_layers(LAYERS, COUNTS);
  refresh_score();

  refresh_column();
}

function new_piece(canvas, ctx) {
  reset(canvas, ctx);
}

function game_over(canvas, ctx) {
  clearTimeout(ID1);
  clearTimeout(ID2);
  render_pit(canvas, ctx);
  end_game(canvas, ctx);
}

function autofall(canvas, ctx) {
  var nvoxels = project_voxels(STATE.piece, STATE.new_x, STATE.new_y, STATE.new_z + DELTA, STATE.new_matrix);
  if (!is_overlap_layers(nvoxels, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, LAYERS)) {
    set_start();
    STATE.new_z += DELTA;
  } else {
    speed_up(canvas, ctx);
    touchdown();
    if (STATE.new_z == 0) game_over(canvas, ctx);
    else new_piece(canvas, ctx);
  }
}

/*****************************************************************************************/
// User interface
/*****************************************************************************************/
function change_set(el) {
  var which = el.innerHTML.toLowerCase();
  SET = which;

  save_settings();
  reset_allowed();
}

function change_pit(el, canvas, ctx) {
  var dimensions = el.innerHTML.toLowerCase().split('x');
  PIT_WIDTH = parseInt(dimensions[0]);
  PIT_HEIGHT = parseInt(dimensions[1]);
  PIT_DEPTH = parseInt(dimensions[2]);

  save_settings();

  init_colors(PIT_DEPTH);

  reset_pit(3);
  render_pit(canvas, ctx);

  reset_allowed();
}

function change_speed(el) {
  var speed = parseInt(el.innerHTML);
  SPEED = speed;
  AUTOFALL_DELAY = SPEED_MAP[SPEED];

  save_settings();
}

function speed_up(canvas, ctx) {
  BLOCKS_PLACED++;
  if (BLOCKS_PLACED % 50 === 0) {
    if (GAME_SPEED < 4) GAME_SPEED++;
    AUTOFALL_DELAY = SPEED_MAP[GAME_SPEED];
    clearTimeout(ID2);
    if (AUTOFALL_DELAY) {
      ID2 = setInterval(function () {
        autofall(canvas, ctx);
      }, AUTOFALL_DELAY);
    }
    $('#speed .button').each(function () {
      $(this).removeClass('on');
      if ($(this).text().toLowerCase() == GAME_SPEED) $(this).addClass('on');
    });
    save_settings();
  }
}

function reset_allowed() {
  ALLOWED = [];
  for (var i = 0; i < PIECES[SET].length; ++i) {
    var bb = PIECES[SET][i].bb;
    if (
      bb.x[0] >= 0 &&
      bb.x[1] <= PIT_WIDTH &&
      bb.y[0] >= 0 &&
      bb.y[1] <= PIT_HEIGHT &&
      bb.z[0] >= 0 &&
      bb.z[1] <= PIT_DEPTH
    )
      ALLOWED.push(i);
  }
}

/*****************************************************************************************/
// User interface (macros)
/*****************************************************************************************/
function set_ui_start() {
  STATE.setkeys = 0;
  $('.hud').css('display', 'none');
  $('#column').css('display', 'none');
  $('#footer').css('display', 'block');
  $('#message').css('display', 'block');
  $('#difficulty').css('display', 'block');
}

function set_ui_game() {
  $('.hud').css('display', 'none');
  $('#footer').css('display', 'none');
  $('#score').css('display', 'block');
  $('#column').css('display', 'block');
}

function set_ui_gameover() {
  $('#column').css('display', 'none');
  $('.hud').css('display', 'none');
  $('#score').css('display', 'none');
  $('#over').css('display', 'none');
  $('#footer').css('display', 'block');
  $('#getGamerName').css('display', 'block');
  $('#difficulty').css('display', 'block');
}

function refresh_score() {
  $('#score').text(pretty_number(STATE.score));
}

/*****************************************************************************************/
// Settings
/*****************************************************************************************/
function save_settings() {
  var tmp = SET + ':' + PIT_WIDTH + ':' + PIT_HEIGHT + ':' + PIT_DEPTH + ':' + SPEED;
  $.cookie('co_settings', tmp, { expires: 10000 });
}

function load_settings() {
  var tmp = $.cookie('co_settings');
  if (tmp) {
    var chunks = tmp.split(':');
    var set = chunks[0];
    if (TEMPLATES[set] != undefined) SET = set;

    PIT_WIDTH = parseInt(chunks[1]);
    PIT_HEIGHT = parseInt(chunks[2]);
    PIT_DEPTH = parseInt(chunks[3]);

    SPEED = parseInt(chunks[4]);
    AUTOFALL_DELAY = SPEED_MAP[SPEED];
  }
}

/*****************************************************************************************/
// Custom keys
/*****************************************************************************************/
function pretty_key(keycode) {
  if (keycode >= 48 && keycode <= 122) return String.fromCharCode(keycode);
  if (KEYCODES[keycode] != undefined) return KEYCODES[keycode];
  return keycode;
}

function reset_key_labels() {
  $('#keyset .lbl').each(function () {
    var label = $(this).text();
    var val = $(this).parent().find('.val');
    val.text(pretty_key(KEYMAP_TMP[LABELMAP[label]]));
  });
}

function set_key(keycode) {
  if (LAST_KEY_EL) {
    var label = LAST_KEY_EL.text();
    KEYMAP_TMP[LABELMAP[label]] = keycode;
    LAST_KEY_EL.parent().find('.val').text(pretty_key(keycode));
  }
}

function new_key(el) {
  LAST_KEY_EL = el;
  $('#keyset .val').removeClass('active');
  $('#keyset .lbl').removeClass('active');
  LAST_KEY_EL.addClass('active');
  LAST_KEY_EL.parent().find('.val').addClass('active');
}

function copy_keymap(src, dst) {
  for (var i in src) dst[i] = src[i];
}

function accept_keys() {
  copy_keymap(KEYMAP_TMP, KEYMAP);
}

function reset_keys() {
  copy_keymap(KEYMAP_DEFAULT, KEYMAP_TMP);
  reset_key_labels();
}

function save_keys() {
  var tmp = [];
  for (var i in KEYMAP) tmp.push(i + ':' + KEYMAP[i]);
  $.cookie('co_keymap', tmp.join('|'), { expires: 10000 });
}

function load_keys() {
  var tmp = $.cookie('co_keymap');
  if (tmp) {
    KEYMAP = {};
    var key = tmp.split('|');
    for (var i = 0; i < key.length; ++i) {
      var chunks = key[i].split(':');
      var label = chunks[0];
      var value = parseInt(chunks[1]);
      KEYMAP[label] = value;
    }
  }
}

function change_keys(canvas, ctx) {
  STATE.setkeys = 1;

  $('.hud').css('display', 'none');
  $('#score').css('display', 'none');
  $('#keyset').css('display', 'block');

  copy_keymap(KEYMAP, KEYMAP_TMP);
  reset_key_labels();
}

/*****************************************************************************************/
// Highscore
/*****************************************************************************************/
function difhash(set, width, height, depth, speed) {
  return width + 'x' + height + 'x' + depth + ':' + set[0] + ':' + speed;
}

function save_score() {
  var tmp = [];
  for (var name in HIGHSCORE) {
    tmp.push(name + '|' + HIGHSCORE[name].mode + '|' + HIGHSCORE[name].score);
  }
  $.cookie('co_highscore', tmp.join(','), { expires: 10000 });
}

function load_score() {
  var tmp = $.cookie('co_highscore');
  if (tmp) {
    HIGHSCORE = {};
    var hs = tmp.split(',');
    for (var i = 0; i < hs.length; ++i) {
      var chunks = hs[i].split('|');
      HIGHSCORE[chunks[0]] = {
        mode: chunks[1],
        score: parseInt(chunks[2]),
       };
    }
  }
}

function generate_highscores() {
  var tmp = [];
  for (var name in HIGHSCORE) {
    var chunks = HIGHSCORE[name].mode.split(':');
    var dim = chunks[0];
    var s = chunks[1];
    var x = chunks[2];
    var sfull = '';
    if (s == 'f') sfull = 'flat';
    else if (s == 'b') sfull = 'basic';
    else if (s == 'e') sfull = 'extended';
    var row =
      '<tr><td>' +
      name +
      '</td><td>' +
      dim +
      '</td><td>' +
      sfull +
      '</td><td>' +
      x +
      "</td><td class='ths'>" +
      pretty_number(HIGHSCORE[name].score) +
      '</td></tr>';
    tmp.push(row);
  }
  return (
    '<table><tr><th>Name</th><th>Pit</th><th>Pieces</th><th>Speed</th><th>Score</th></tr>' +
    tmp.join(' ') + '</table>'
  );
}

function show_highscores() {
  $('.hud').css('display', 'none');
  $('#hscontent').html(generate_highscores());
  $('#highscores').css('display', 'block');
}

/*****************************************************************************************/
// Colum
/*****************************************************************************************/
function refresh_column() {
  var xcanvas = $('#screen2');
  var canvas = xcanvas.get(0);
  var ctx = canvas.getContext('2d');
  var width = xcanvas.parent().width();
  var height = xcanvas.parent().height();

  xcanvas.attr('width', width).attr('height', height);

  var i, c, top, bottom, lingrad;
  var unit = width;
  var sy = height - (unit + 2) * COUNTS.length + 2;
  for (i = 0; i < COUNTS.length; ++i) {
    top = sy + i * (unit + 2);
    if (COUNTS[i] != undefined && COUNTS[i] > 0) {
      var c = COLORS[COLORS.length - 1 - i];
      var c2 = 'hsla(' + c[0] + ',' + c[1] + '%,' + (c[2] - 10) + '%,' + c[3] + ')';
      var c1 = 'hsla(' + c[0] + ',' + c[1] + '%,' + (c[2] - 30) + '%,' + c[3] + ')';

      bottom = top + unit;
      lingrad = ctx.createLinearGradient(0, top, width, bottom);
      lingrad.addColorStop(0.0, c2);
      lingrad.addColorStop(1.0, c1);
      ctx.fillStyle = lingrad;
      //ctx.fillStyle = c1;
    } else {
      ctx.fillStyle = '#050505';
    }
    ctx.fillRect(0, top, unit, unit);
  }
}

/*****************************************************************************************/
// Main
/*****************************************************************************************/

var rotateSpeed = "medium";

function setRotateSpeed(spd) {
    if (spd === "slow")

      ANIM_DURATION = SLOW_ANIM_DURATION;
    else if (spd === "fast") {
        ANIM_DURATION = FAST_ANIM_DURATION;
    } else {
        ANIM_DURATION = MED_ANIM_DURATION;
    }
}

$(document).ready(function () {
  copy_keymap(KEYMAP_DEFAULT, KEYMAP);
  copy_keymap(KEYMAP, KEYMAP_TMP);

  load_settings();
  load_keys();
  load_score();

  var xcanvas = $('#screen');
  var canvas = xcanvas.get(0);
  var ctx = canvas.getContext('2d');
  xcanvas.attr('width', WIDTH).attr('height', HEIGHT);

  precompute_pieces();
  init_colors(PIT_DEPTH);

  reset_pit(3);
  render_pit(canvas, ctx);
  reset_allowed();

  init_game_keys(canvas, ctx);

  // difficulty settings
  $('#pieces .button').each(function () {
    if ($(this).text().toLowerCase() == SET) $(this).addClass('on');
  });
  $('#pieces .button').click(function () {
    change_set($(this).get(0));
    $('#pieces .button').removeClass('on');
    $(this).addClass('on');
  });


      $("#rotSpeed .button").each(function() {
        if ($(this).text().toLowerCase() == rotateSpeed) $(this).addClass("on");
    });
    $("#rotSpeed .button").click(function() {
        setRotateSpeed($(this).text().toLowerCase());
        $("#rotSpeed .button").removeClass("on");
        $(this).addClass("on");
    });



  var pit_string = PIT_WIDTH + 'x' + PIT_HEIGHT + 'x' + PIT_DEPTH;
  $('#pit .button').each(function () {
    if ($(this).text().toLowerCase() == pit_string) $(this).addClass('on');
  });
  $('#pit .button').click(function () {
    change_pit($(this).get(0), canvas, ctx);
    $('#pit .button').removeClass('on');
    $(this).addClass('on');
  });

  $('#speed .button').each(function () {
    if ($(this).text().toLowerCase() == SPEED) $(this).addClass('on');
  });
  $('#speed .button').click(function () {
    change_speed($(this).get(0));
    $('#speed .button').removeClass('on');
    $(this).addClass('on');
  });

  // custom keys
  $('#keys .button').click(function () {
    change_keys();
  });

  $('#keyset .lbl').click(function () {
    new_key($(this));
  });

  $('#keys_ok').click(function () {
    LAST_KEY_EL = 0;
    accept_keys();
    save_keys();
    set_ui_start();
    STATE.setkeys = 0;
  });
  $('#keys_cancel').click(function () {
    LAST_KEY_EL = 0;
    set_ui_start();
    STATE.setkeys = 0;
  });
  $('#keys_reset').click(function () {
    reset_keys();
  });

  // high scores
  $('#hs').click(function () {
    show_highscores();
  });
  $('#hs_back').click(function () {
    set_ui_start();
  });

  refresh_column();
});

function showScoreUI() {
  USERNAME = document.getElementById('username').value;

  USERNAME = USERNAME ? USERNAME.toLowerCase() : '';

  clearTimeout(ID1);
  clearTimeout(ID2);

  var hs = 'Score:';
  var dh = difhash(SET, PIT_WIDTH, PIT_HEIGHT, PIT_DEPTH, SPEED);
  if (STATE.score > 0 && (typeof HIGHSCORE[USERNAME] === 'undefined' || HIGHSCORE[USERNAME].score < STATE.score)) {
    HIGHSCORE[USERNAME] = {
      mode: dh,
      score: STATE.score,
    };

    save_score();
    hs = "<span id='highscore'>New high score:</span>";
  }

  $('#scorelabel').html(hs);
  $('#username-label').text(USERNAME);
  $('#finalscore').text(pretty_number(STATE.score));

  $('#getGamerName').css('display', 'none');
  $('#over').css('display', 'block');

  init_game_keys(CANVAS, CTX);

  USERNAME = '';
}

// Local variables:
// indent-tabs-mode: nil
// End:
