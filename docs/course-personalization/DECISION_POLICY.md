# Decision Policy

## Objective

Decide whether to ask another question or make a recommendation.

## Hidden scoring dimensions

Each candidate course should be scored against:
- topic match
- learner level fit
- goal fit
- learning style fit
- time fit
- constraints fit

## Suggested scoring weights

- Topic match: 35%
- Level fit: 20%
- Goal fit: 20%
- Learning style fit: 10%
- Time fit: 10%
- Constraints fit: 5%

## Decision logic

### Ask another question when
- the learner's goal is still vague
- multiple course families still seem equally likely
- level mismatch risk is high
- time commitment is unknown and strongly affects recommendations

### Recommend now when
- there is a clear topic and goal
- learner level is known or strongly inferable
- at least one course stands out clearly
- another follow-up would create friction more than value

## Recommendation count rule

- Recommend **one** course when there is a clear winner.
- Recommend **two** courses only when the second option is genuinely useful and meaningfully different.
- Never recommend more than two.

## Backup recommendation rule

A backup course is allowed only if one of these is true:
- one is more practical and the other is more foundational
- one is faster and the other is deeper
- one is budget-friendly and the other is premium but stronger

## Confidence heuristic

You can maintain a confidence score from 0.0 to 1.0.

Example interpretation:
- 0.00 to 0.39 -> ask more
- 0.40 to 0.69 -> maybe one targeted follow-up
- 0.70+ -> recommend now

## Hard stopping rule

Do not continue interviewing once the assistant has enough information to make a good recommendation.
Too many questions lowers trust and makes the assistant feel like a form.
