// Original display excerpt, written for the portfolio. It does not run.
const excerpt = `package client.modules.combat;

import client.engine.prediction.MotionSnapshot;
import client.engine.scene.CrystalCandidate;
import client.render.OverlayRenderer;

@Module(name = "AutoCrystal", category = Category.COMBAT)
public final class AutoCrystal extends Module {
    private final AtomicReference<CombatFrame> frame =
        new AtomicReference<>(CombatFrame.empty());

    private final Setting<Float> range = setting("Range", 4.5f);
    private final Setting<Boolean> predict = setting("Predict", true);

    @Subscribe
    public void onSceneUpdate(final SceneUpdateEvent event) {
        final MotionSnapshot snapshot = prediction.capture(event.tick());
        final List<CrystalCandidate> candidates = scene.query(snapshot);

        final Optional<CrystalCandidate> selection = candidates.stream()
            .filter(candidate -> candidate.visible(snapshot))
            .filter(candidate -> candidate.distance() <= range.get())
            .max(Comparator.comparingDouble(this::evaluate));

        frame.set(new CombatFrame(event.tick(), snapshot, selection));
    }

    private double evaluate(final CrystalCandidate candidate) {
        final double confidence = prediction.confidence(candidate);
        return candidate.score() * confidence - candidate.exposure();
    }

    @Subscribe
    public void onRender(final RenderEvent event) {
        frame.get().selection().ifPresent(candidate ->
            OverlayRenderer.outline(event.matrices(), candidate.bounds(),
                theme.accent().withAlpha(0.65f)));
    }
}`;

const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function highlight(line) {
  return line.split(/("[^"\n]*"|@[\w]+|\b(?:package|import|public|private|final|class|extends|new|void|return|this|true|false|double)\b|\b\d+(?:\.\d+)?f?\b|\b[A-Z][A-Za-z]+\b)/g).map(token => {
    let type = /^"/.test(token) ? 'string' : /^@/.test(token) ? 'annotation' : /^(?:package|import|public|private|final|class|extends|new|void|return|this|true|false|double)$/.test(token) ? 'keyword' : /^\d/.test(token) ? 'number' : /^[A-Z]/.test(token) ? 'type' : '';
    return type ? `<span class="code-${type}">${escape(token)}</span>` : escape(token);
  }).join('');
}

export function CodeBackdrop() {
  return `<div class="code-backdrop" aria-hidden="true" inert>
    <div class="ide-titlebar"><span class="ide-mark">IJ</span><span>client / src / main / java</span><span class="ide-run">▷ <span>Development</span></span><span>− □ ×</span></div>
    <div class="ide-workspace"><div class="ide-files"><span>⌄ client</span><span>⌄ src</span><span>⌄ modules</span><span>⌄ combat</span><b>AutoCrystal.java</b><span>CrystalCandidate.java</span><span>MotionSnapshot.java</span><span>CombatFrame.java</span></div>
    <div class="ide-editor"><div class="ide-tab"><span>J</span> AutoCrystal.java <span>×</span></div><div class="ide-code">${excerpt.split('\n').map((line, index) => `<div class="code-line${index === 18 ? ' code-line-active' : ''}"><span class="code-line-number">${index + 1}</span><code>${highlight(line) || ' '}</code></div>`).join('')}</div></div></div>
    <div class="ide-status"><span>⑂ main</span><span>Java · UTF-8 · 4 spaces</span></div>
  </div>`;
}
