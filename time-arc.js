function TimeArc (svgSelector, startTime, endTime, options) {
  const defaultOptions = {
    width: 5,
    radius: 100,
    color: '#000',
    x: 105,
    y: 105,
  };

  this.options = Object.assign(defaultOptions, options);
  this.svgSelector = svgSelector;
  this.startAngle = this.timeToAngle(startTime);
  this.endAngle = this.timeToAngle(endTime);

  this.render();
}

TimeArc.prototype.timeToAngle = function (unixTime) {
  const degreesInMinute = 360 / (12 * 60);
  const time = moment.unix(unixTime);
  const twelveOClockPosition = moment.unix(unixTime).hours(0).minutes(0);

  const timeInMinutes = moment.duration(time.diff(twelveOClockPosition)).asMinutes();

  return timeInMinutes * degreesInMinute;
}

TimeArc.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

TimeArc.prototype.getArc = function () {
  const { x, y, radius } = this.options;

  const start = this.polarToCartesian(x, y, radius, this.endAngle);
  const end = this.polarToCartesian(x, y, radius, this.startAngle);

  const largeArcFlag = this.endAngle - this.startAngle <= 180 ? "0" : "1";

  const d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");

  return d;
}

TimeArc.prototype.render = function () {
  const svg = document.querySelector(this.svgSelector);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', this.options.color);
  path.setAttribute('stroke-width', this.options.width);
  path.setAttribute('d', this.getArc());

  svg.appendChild(path);
}
