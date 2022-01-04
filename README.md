<h1 align="center">Kita Color</h1>
<h3 align="center">Color converter library</h3>

<p align="right"><sup>* README.md is still being written</sup></p>

<p align="center">Color converter capable of converting colors to different representations.</p>

<hr>

<h3 align="center">This is a component of <a href=#about-kita>Kita</a></h3>

<hr>

<h2 id="get-in-npm" align="center">Exemples</h2>

<p>At the moment there is just a simple example available of how to use the library.</p>
<p>Examples will be available in the "example" folder, simply run:</p>

```bash
node example/xxx.js
```

<hr>

<h2 id="todos" align="center">TODOs</h2>

<h3 id="pending">Pending</h3>

```objc
- [ ] Publish in npm
- [ ] Write README.md
- [ ] Add more color types
- [ ] Add more examples
- [ ] Create tests with Philips Hue bridge to test HueYxy conversion
- [ ] Add documentation
- [ ] Convert to TypeScript
- [ ] Debug mode
- [ ] Logging
- [ ] Errors
- [ ] TODOs in code // https://github.com/ClownChu/kita-color/search?q=TODO+%3A
```

<p align="right"><sup>* Not in order of priority</sup></p>

<h3 id="completed">Completed</h3>

```objc
- [x] Write examples // v0.0.1 - https://github.com/ClownChu/kita-color/commits/0.0.1
- [x] Write tests // v0.0.1 - https://github.com/ClownChu/kita-color/commits/0.0.1
- [x] Create base // v0.0.1 - https://github.com/ClownChu/kita-color/commits/0.0.1
```

<hr>

<h2 align="center" id="about-kita">About Kita</h2>
<div>
    <code>Kita</code> is a personal assistant developed by <a href="https://www.linkedin.com/in/vitor-de-souza-software"  target="_blank">Vitor de Souza</a> (<a href="htps://github.com/ClownChu" target="_blank">ClownChu</a>). Currently coded in <a href="https://dotnet.microsoft.com" target="_blank">.NET</a>, <a href="https://golang.org" target="_blank">Go</a>, and <a href="https://nodejs.org" target="_blank">Node.js</a>. This personal assistant helps with daily tasks, such as: controlling computers, lights, network, schedules, repetitive tasks, among other features.
</div>

<hr>

<h2 align="center" id="supported-color-representations">Supported color representations</h2>
<table align="center">
    <thead>
        <tr>
            <th>
                <figure>
                    <img src="https://icon-library.com/images/rgb-icon/rgb-icon-4.jpg" alt="RGB" width="24px" height="24px" />
                </figure>
            </th>
            <th>
                <figure>
                    <img src="https://3.bp.blogspot.com/-2OIxuVu7SZs/UlwTxrHSq_I/AAAAAAAABfc/s_yCWsrvciY/s1600/htmlcolorcode.jpg" alt="Hex" width="24px" height="24px" />
                </figure>
            </th>
            <th>
                <figure>
                    <img src="https://www.researchgate.net/profile/Kemal_Erdogan3/publication/284698928/figure/download/fig1/AS:614113810071566@1523427550628/HSV-color-space-Hue-saturation-value.png" alt="HSV" width="24px" height="24px" />
                </figure>
            </th>
            <th>
                <figure>
                    <img src="https://i2.wp.com/www.appletips.nl/wp-content/uploads/2016/02/Philips-Hue.png" alt="Philips HueYxy" width="24px" height="24px" />
                </figure>
            </th>
        </tr>
        <tr>
            <th align="center">RGB</th>
            <th align="center">Hex</th>
            <th align="center">HSV</th>
            <th align="center">HueYxy</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">rgb(255, 255, 255)</td>
            <td align="center">#FFFFFF</td>
            <td align="center">hsv(0, 0, 1)</td>
            <td align="center">hueyxy(255, 0.33323558422862626, 0.33323558422862626)</td>
        </tr>
    </tbody>
</table>

<hr>

<h2 align="center" id="license">License</h2>
<div align="center">
    <a href="https://github.com/ClownChu/kita-color" target="_blank">Kita Color source code</a> is made available under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank">GNU Affero General Public License v3.0</a> license. (<a href="https://choosealicense.com/licenses/agpl-3.0/" target="_blank">Read more</a>)
</div>
