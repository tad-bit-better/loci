import { router } from 'expo-router';
import { FreeRecall } from '@/components/FreeRecall';
import { storyWords } from '@/data/sample';
import { setSetting } from '@/lib/localDb';

/** End of step 3: recall the story's words. The score is the "after" on the hook screen. */
export default function RetestScreen() {
  return (
    <FreeRecall
      words={storyWords}
      step="step 3 of 4"
      title="Replay the story. Write every word."
      hint="Start with the hungry elephant and walk through the story, scene by scene."
      onDone={async (score) => {
        await setSetting('retestScore', String(score));
        router.replace('/onboarding/hook');
      }}
    />
  );
}
