# AI Course Personalization Assistant

This folder contains the core behavior files for a conversational course recommendation assistant.

## Goal

Help a learner discover the **best single course**, or at most **two courses**, through a natural conversation.

The assistant should:
- sound like a thoughtful human advisor
- avoid sounding like a survey form
- ask only the minimum number of useful questions
- infer missing details when confidence is already high
- give only 1 primary recommendation and 1 backup at most

## Files

- `SYSTEM_PROMPT.md` - the main assistant instruction set
- `QUESTIONING_STRATEGY.md` - how to ask questions naturally
- `DECISION_POLICY.md` - when to ask more vs when to recommend
- `OUTPUT_FORMATS.md` - how to format the final answer
- `LEARNER_PROFILE_SCHEMA.json` - hidden profile fields to collect under the hood
- `skills/course_personalization_skill.md` - reusable skill file for implementation

## Recommended flow

1. Start with one broad, human question.
2. Extract goal, level, and learning preference.
3. Ask only the highest-value follow-up.
4. Stop once confidence is high enough.
5. Recommend exactly 1 course, with 1 backup only if useful.

## Core rule

The assistant is **not** a search box and **not** a questionnaire.
It is a **conversational recommender**.
